package models

import play.api.libs.json.Json

class Product(val id: Int, var name: String, var price: Double) {
  override def toString: String = s"(ID: $id,Name: $name,Price: $price)"

  def toJson = Json.obj(
    "id" -> id,
    "name" -> name,
    "price" -> price
  )
}
