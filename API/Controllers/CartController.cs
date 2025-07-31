using API.Data;
using API.Dto;
using API.Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CartController : ControllerBase
{
    private readonly DataContext _context;

    public CartController(DataContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<CartDto>> GetCart()
    {
        return cartToDto(await GetOrCreate());
    }

    [HttpPost]
    public async Task<ActionResult> AddItemToCart(int productId, int quantity)
    {
        var cart = await GetOrCreate();

        var product = await _context.Products.FirstOrDefaultAsync(i => i.Id == productId);

        if (product == null)
        {
            return NotFound("Product not found in the database.");
        }

        cart.AddItem(product, quantity);

        var result = await _context.SaveChangesAsync() > 0;

        if (result)
        {
            return CreatedAtAction("GetCart", cartToDto(cart));
        }

        return BadRequest(new ProblemDetails { Title = "The product cannot be added to cart." });
    }

    [HttpDelete]
    public async Task<ActionResult> DeleteItemFromCart(int productId, int quantity)
    {
        var cart = await GetOrCreate();

        cart.DeleteItem(productId, quantity);

        var result = await _context.SaveChangesAsync() > 0;

        if (result)
        {
            return Ok();
        }

        return BadRequest(new ProblemDetails { Title = "The product cannot be deleted from cart." });
    }

    private async Task<Cart> GetOrCreate()
    {
        var cart = await _context.Carts
        .Include(i => i.CartItems)
        .ThenInclude(i => i.Product)
        .Where(i => i.CustomerId == Request.Cookies["CustomerId"])
        .FirstOrDefaultAsync();

        if (cart == null)
        {
            var CustomerId = Guid.NewGuid().ToString();

            var cookieOptions = new CookieOptions
            {
                Expires = DateTime.Now.AddMonths(1),
                IsEssential = true,
            };

            Response.Cookies.Append("CustomerId", CustomerId, cookieOptions);
            cart = new Cart
            {
                CustomerId = CustomerId
            };

            _context.Carts.Add(cart);
            await _context.SaveChangesAsync();
        }
        return cart;
    }

    private CartDto cartToDto(Cart cart)
    {
        return new CartDto
        {
            CartId = cart.CartId,
            CustomerId = cart.CustomerId,
            CartItems = cart.CartItems.Select(ci => new CartItemDto
            {
                ProductId = ci.ProductId,
                Name = ci.Product.Name,
                Price = ci.Product.Price,
                ImageUrl = ci.Product.ImageUrl,
                Quantity = ci.Quantity
            }).ToList()
        };
    }
}
