import spark.Spark.*
import java.io.File
fun main(args: Array<String>) {
    staticFiles.location("/public")
    var gameMap = MapLoader();
    val jsonFile = File("map.json");
    val isCreated:Boolean = jsonFile.createNewFile();
    if (isCreated) jsonFile.writeText("[]")
    post("/add") { request, response -> gameMap.add(request, response) }
    post("/load") { request, response -> gameMap.load(request, response) }
    get("/game") { request, response -> response.redirect("dist/src/index.html") }
    get("/editor") { request, response -> response.redirect("editor.html") }
    get("/") { request, response -> response.redirect("index.html") }
}
