using Microsoft.AspNetCore.Mvc;

using Newtonsoft.Json.Linq;

using System.Web;



namespace NetCoreReactTask.Controllers;

[ApiController]
[Route("[controller]")]
public class SpaceXController : ControllerBase
{

    private readonly ILogger<SpaceXController> _logger;

    public SpaceXController(ILogger<SpaceXController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public string Get()
    {
        string baseURL = $"https://api.spacexdata.com/v3/launches";

        var client = new System.Net.WebClient();

        return client.DownloadString(baseURL.ToString());
    }
    [HttpPost]
    public string Get(string flight_number)
    {
        string baseURL = $"https://api.spacexdata.com/v3/launches/{flight_number}";

        var client = new System.Net.WebClient();

        return client.DownloadString(baseURL.ToString());
    }

}

