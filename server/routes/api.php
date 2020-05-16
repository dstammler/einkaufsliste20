<?php

use Illuminate\Http\Request;

use App\Item;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

# Lists
Route::get('lists','ShoppinglistController@index');

Route::get('lists/{listId}','ShoppinglistController@getByListID','ItemController@getByListID');


Route::get('openlists','ShoppinglistController@getAllOpenLists');

Route::get('openlists/{userId}','ShoppinglistController@getOpenListsByUserId');
Route::get('donelists/{userId}','ShoppinglistController@getDoneListsByUserId');




# Items
Route::get('items','ItemController@index');
Route::get('items/{listId}','ItemController@getByListID');
Route::get('item/{id}','ItemController@checkID');
Route::get('items/search/{searchTerm}','ItemController@checkID');

Route::post('item', 'ItemController@save');

Route::put('item/{id}','ItemController@update');

Route::delete('item/{id}', 'ItemController@delete');

/* auth init */
Route::group(['middleware' => ['api', 'cors']], function () {
    Route::post('auth/register', 'Auth\ApiRegisterController@create');
    Route::post('auth/login', 'Auth\ApiAuthController@login');
});

/* auth general */
Route::group(['middleware' => ['api','cors','auth.jwt']],function (){
    Route::get('users/{userId}','ShoppinglistController@getUserById');
    Route::get('lists/{listId}/comments','ShoppinglistController@getComments');
    Route::post('auth/logout', 'Auth\ApiAuthController@logout');
    Route::post('lists/{listId}/comment', 'ShoppinglistController@postComment');
    Route::delete('comment/{commentId}','ShoppinglistController@deleteComment');
    Route::put('item/{itemId}/check','ItemController@checkItem');
    Route::put('item/{itemId}/togglecheck','ItemController@toggleCheckItem');
    Route::put('item/{itemId}/uncheck','ItemController@uncheckItem');
});

/* auth seeker */
Route::group(['middleware' => ['api','cors','auth.jwt','auth.seeker']], function(){
    Route::post('lists','ShoppinglistController@save');
    Route::put('lists/{listId}','ShoppinglistController@update');
    Route::delete('lists/{listId}','ShoppinglistController@delete');
});

/* auth helper */
Route::group(['middleware' => ['api','cors', 'auth.jwt', 'auth.helper']], function(){
    Route::put('lists/{listId}/helper/{helperId}', 'ShoppinglistController@registerHelper');
    Route::put('lists/{listId}/unregisterhelper', 'ShoppinglistController@unregisterHelper');
    Route::put('lists/{listId}/updatefinalprice', 'ShoppinglistController@updateFinalPrice');
});




