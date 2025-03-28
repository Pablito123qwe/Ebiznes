package controllers

import javax.inject._
import play.api._
import play.api.mvc._
import play.api.libs.json._
import models.Product
import scala.collection.mutable.ArrayBuffer

@Singleton
class ProductController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {

  var products = ArrayBuffer[Product](
    new Product(0, "Milk", 5.5),
    new Product(1, "Apple", 1.3)
  )

  def show_all: Action[AnyContent] = Action {
    val json = JsArray(products.map(_.toJson))
    Ok(json)
  }

  def get_product_by_id(id: Int): Action[AnyContent] = Action {
    products.find(_.id == id) match {
      case Some(product) => Ok(product.toJson)
      case None => Ok("Error")
    }
  }

  def add_new_product: Action[JsValue] = Action(parse.tolerantJson) { request =>
    val json = request.body
    val name = (json \ "name").as[String]
    val price = (json \ "price").as[Double]

    val product = Product(products.length, name, price)
    products += product
    Ok(json)
  }

  def update_product(id: Int): Action[JsValue] = Action(parse.tolerantJson) { request =>
    val json = request.body
    val name = (json \ "name").as[String]
    val price = (json \ "price").as[Double]

    products.find(_.id == id) match {
      case Some(product) =>
        product.name = name
        product.price = price
        Ok(Json.obj("message" -> s"Product with id $id updated"))
      case None =>
        NotFound(Json.obj("error" -> s"Product with id $id not found"))
    }
  }

  def delete_product(id: Int): Action[AnyContent] = Action {
    val productToRemove = products.find(_.id == id)

    productToRemove match {
      case Some(product) =>
        products = products.filterNot(_.id == id)
        Ok(Json.obj("message" -> s"Product $id deleted"))

      case None =>
        NotFound(Json.obj("error" -> "Product not found"))
    }
  }

}
