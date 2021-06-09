import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import spark.Request
import spark.Response
import java.io.File
import Level.LevelItem

class Map {
    private fun main(data: String): String {
        val gson = Gson()
        val type = object: TypeToken<MutableList<LevelItem>>() {}.type
        val list: MutableList<LevelItem> = gson.fromJson(data, type)
        println(list)

        return gson.toJson(list)
    }

    fun load(req: Request, res: Response): String {
        val data = File("map.json").readText()
        return main(data)
    }

    fun add(req: Request, res: Response) {
        File("map.json").writeText(main(req.body()))
    }
}
