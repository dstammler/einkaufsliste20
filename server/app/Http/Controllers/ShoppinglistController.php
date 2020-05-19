<?php

namespace App\Http\Controllers;

use App\Comment;
use App\Item;
use App\ShoppingList;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Database\Eloquent;
use Illuminate\Support\Facades\DB;

class ShoppinglistController extends Controller
{
    /*
     *  get methods
     */
    public function index()
    {
        return ShoppingList::with(['seeker', 'helper','items'])->get();
    }

    public function getByListID($listId)
    {
        return ShoppingList::with(['seeker', 'helper','items','comments'])->where('id', $listId)->first();
    }

    public function getListByHelperId($helper_id){
        return ShoppingList::with(['seeker','helper','items'])->where('helper_id', $helper_id)->get();
    }

    public function getListBySeekerId($seeker_id){
        return ShoppingList::with(['seeker','helper','items'])->where('seeker_id', $seeker_id)->get();
    }

    public function getUserById($userId)
    {
        return User::where('id', $userId)->first();
    }

    public function getAllOpenLists(){
        $date = date('Y-m-d H:i:s');
        return ShoppingList::with(['seeker','helper','items'])
            ->where('end_date','>=',$date)
            ->whereNull('helper_id')
            ->orderBy('end_date','desc')
            ->get();
    }

    public function getOpenListsByUserId($userId){
        $date = date('Y-m-d H:i:s');
        return ShoppingList::with(['seeker','helper','items'])
            ->where('end_date','>=',$date)
            ->where(function ($query) use ($userId){
                $query->where('seeker_id',$userId)
                    ->orWhere('helper_id',$userId);
            })->orderBy('end_date','asc')->get();
    }

    public function getDoneListsByUserId($userId){
        $date = date('Y-m-d H:i:s');
        return ShoppingList::with(['seeker','helper','items'])
            ->where('end_date','<',$date)
            ->where(function ($query) use ($userId) {
                $query->where('seeker_id', $userId)
                    ->orWhere('helper_id', $userId);
            })->orderBy('end_date','desc')->get();
    }

    public function getComments($listId){
        return Comment::where('shopping_list_id', $listId)->get();
    }

    public function updateFinalPrice(Request $request, $listId){
        DB::beginTransaction();
        try{
            $list = ShoppingList::where('id', $listId)->first();
            $list->update($request->all());
            $list->save();
            DB::commit();
            return response()->json($list, 201);
        }
        catch(\Exception $e){

            DB::rollBack();
            return response()->json("saving price failed: " . $e->getMessage(), 420);
        }
    }


    /*
     * save, delete and update shoppinglist
     */

    public function save(Request $request): JsonResponse
    {
        DB::beginTransaction();
        try {
            $list = ShoppingList::create($request->all());
            if(isset($request['items']) && is_array($request['items'])){
                foreach($request['items'] as $i){
                    $item = Item::firstOrNew([
                        'label' => $i['label'],
                        'amount' => $i['amount'],
                        'unit' => $i['unit'],
                        'max_price' => $i['max_price']
                    ]);
                    $list->items()->save($item);
                }
            }


            DB::commit();
            // return a vaild http response
            return response()->json($list, 201);
        } catch (\Exception $e) {
            // rollback all queries
            DB::rollBack();
            return response()->json("saving list failed: " . $e->getMessage(), 420);
        }
    }

    /**
     * returns 200 if item deleted successfully , throws excpetion if not
     */
    public function delete(string $listId): JsonResponse
    {
        $list = ShoppingList::where('id', $listId)->first();
        if ($list != null) {
            $list->delete();
        } else
            throw new \Exception ("List couldn't be deleted - it does not exist");
        return response()->json('Item (' . $listId . ') successfully deleted', 200);
    }

    public function update(Request $request, string $listid ): JsonResponse
    {
        DB::beginTransaction();
        try {
            $list = ShoppingList::with(['seeker','helper','items'])
                ->where('id', $listid)->first();
            if ($list != null) {
                $list->update($request->all());
                $list->save();
            }

            $list->items()->delete();

            if(isset($request['items']) && is_array($request['items'])){
                foreach($request['items'] as $i){
                    $item = Item::firstOrNew([
                        'label' => $i['label'],
                        'amount' => $i['amount'],
                        'unit' => $i['unit'],
                        'max_price' => $i['max_price']
                    ]);
                    $list->items()->save($item);
                }
            }

            DB:: commit();
            $list1 = ShoppingList::with(['seeker','helper','items'])
                ->where('id', $listid)->first();
            // return a vaild http response
            return response()->json($list1, 201);

        } catch (\Exception $e) {
            // rollback all queries
            DB:: rollBack();
            return response()->json("updating list failed: " . $e->getMessage(), 420);
        }
    }

    /*
     * post or delete Comment
     */

    public function postComment(Request $request): JsonResponse {
        DB::beginTransaction();
        try{
            $comment = Comment::create($request->all());
            DB::commit();
            return response()->json($comment, 201);
        }catch(\Exception $e){
            DB::rollBack();
            return response()->json("saving comment failed: " . $e->getMessage(), 420);
        }
    }

    public function deleteComment($commentId){
        $comment = Comment::where('id', $commentId)->first();
        if ($comment != null) {
            $comment->delete();
        } else
            throw new \Exception ("Comment couldn't be deleted - it does not exist");
        return response()->json('Item (' . $commentId . ') successfully deleted', 200);
    }

    /*
     * add or remove Helper
     */
    public function registerHelper($listId, $helperId){
        DB::beginTransaction();
        try{
            $shoppinglist = ShoppingList::where('id', $listId)->first();
            $shoppinglist->update(['helper_id' => $helperId]);
            $shoppinglist->save();
            DB::commit();
            return response()->json($shoppinglist, 201);
        }catch(\Exception $e){
            DB::rollBack();
            return response()->json("saving helper failed: " . $e->getMessage(), 420);
        }
    }

    public function unregisterHelper($listId){
        $list = ShoppingList::where('id', $listId)->first();
        if ($list != null && $list->helper_id != null) {
            $list->update(['helper_id' => null]);
        } else
            throw new \Exception ("Helper couldn't be removed - There is no registered helper in this list.");
        return response()->json('Helper from List (' . $listId . ') successfully removed', 200);
    }
}


