<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Database\Eloquent;
use Illuminate\Support\Facades\DB;

use App\Item;

class ItemController extends Controller
{
    public function index()
    {

        //$items = Item::all();
        //return view('items.index', compact('items'));

        $items = Item::with(['shopping_list'])->get();
        return $items;
        //return Item::with([ 'id' ])
        //->get();
    }

    public function show(Item $item)
    {
        //$item = Item::find($item);
        return view('items.show', compact('item'));
    }

    public function findByListID(string $listId)
    {
        return Item::where('shopping_list_id', $listId)
            ->with(['shopping_list'])
            ->get();
    }

    public function checkID(string $id)
    {
        $item = Item::where('id', $id)->first();
        return $item != null ? response()->json('item with ' . $id . ' exists', 200) :
            response()->json('item with ' . $id . ' does not exists', 404);
    }

    public function findBySearchTerm(string $searchTerm)
    {
        return Item::with('shopping_list')
            ->where('label', 'LIKE', '%' . $searchTerm . '%')->get();
    }

    public function save(Request $request): JsonResponse
    {
        DB::beginTransaction();
        try {
            $item = Item::create($request->all());
            DB:: commit();
            // return a vaild http response
            return response()->json($item, 201);
        } catch (\Exception $e) {
            // rollback all queries
            DB::rollBack();
            return response()->json("saving item failed: " . $e->getMessage(), 420);
        }
    }


    public function update(Request $request, string $id): JsonResponse
    {
        DB:: beginTransaction();
        try {
            $item = Item:: with(['shopping_list'])
                ->where('id', $id)->first();
            if ($item != null) {
                $item->update($request->all());
                $item->save();
            }
            DB:: commit();
            $item1 = Item:: with(['shopping_list'])
                ->where('id', $id)->first();
            // return a vaild http response
            return response()->json($item1, 201);

        } catch (\Exception $e) {
            // rollback all queries
            DB:: rollBack();
            return response()->json("updating item failed: " . $e->getMessage(), 420);
        }
    }

    public function toggleCheckItem($itemId)
    {
        DB::beginTransaction();
        try {
            $item = Item::where('id', $itemId)->first();
            if ($item != null) {
                if($item->checked){
                    $item->update(['checked' => false]);
                } else{
                    $item->update(['checked' => true]);
                }
                $item->save();
                DB:: commit();
            }
            return response()->json($item, 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json("updating item failed: " . $e->getMessage(), 420);
        }
    }

    public function uncheckItem($itemId)
    {
        DB:: beginTransaction();
        try {
            $item = Item::where('id', $itemId)->first();
            if ($item != null) {
                $item->update(['checked' => false]);
                $item->save();
                DB:: commit();
            }
            return response()->json($item, 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json("updating item failed: " . $e->getMessage(), 420);
        }
    }

    /**
     * returns 200 if item deleted successfully , throws excpetion if not
     */
    public function deleteItem(string $id): JsonResponse
    {
        $item = Item::where('id', $id)->first();
        if ($item != null) {
            $item->delete();
        } else
            throw new \Exception ("item couldn't be deleted - it does not exist");
        return response()->json('Item (' . $id . ') successfully deleted', 200);
    }
}
