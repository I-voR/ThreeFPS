import spark.Request
import spark.Response
import java.io.File

class Map {
    fun load(req: Request, res: Response): String {
        val data = File("map.json").readText()

        println(data)
        return data
    }

    fun add(req: Request, res: Response): String {
        println(req.body())
        return ""
    }
}
