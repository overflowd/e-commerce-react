using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ErrorController : ControllerBase
{
    [HttpGet("not-found")]
    public IActionResult NotFoundError()
    {
        return NotFound();
    }

    [HttpGet("bad-request")]
    public IActionResult BadRequestError()
    {
        return BadRequest();
    }

    [HttpGet("unauthorized")]
    public IActionResult UnauthorizedError()
    {
        return Unauthorized();
    }

    [HttpGet("server-error")]
    public IActionResult ServerError()
    {
        throw new Exception("Server error.");
    }

    [HttpGet("validation-error")]
    public IActionResult ValidationError()
    {
        ModelState.AddModelError("Validation error 1", "This is a validation error.");
        ModelState.AddModelError("Validation error 2", "This is a validation error.");
        return ValidationProblem();
    }
}
