import spark.Spark.*
import java.io.File

fun main() {
    staticFiles.location("/public")

    var mapLoader = MapLoader();
    val file = File("map.json");
    val isCreated:Boolean = file.createNewFile();

    get("/") { req, res -> "hello!" }
    get("/map") { req, res -> mapLoader.test(req, res); }
}
