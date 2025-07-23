using API.Entity;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions options) : base(options)
    {

    }

    public DbSet<Product> Products { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Product>().HasData(
            new List<Product>
            {
                new Product
                {
                Id = 1,
                Name = "Iphone 15",
                Description = "Iphone 15 Description",
                Price = 70000,
                IsActive = true,
                ImageUrl = "1.jpg",
                Stock = 100
                },
                new Product
                {
                Id = 2,
                Name = "Iphone 14",
                Description = "Iphone 14 Description",
                Price = 50000,
                IsActive = true,
                ImageUrl = "2.jpg",
                Stock = 100
                },
                new Product
                {
                Id = 3,
                Name = "Iphone 13",
                Description = "Iphone 13 Description",
                Price = 35000,
                IsActive = false,
                ImageUrl = "3.jpg",
                Stock = 100
                },
                new Product
                {
                Id = 4,
                Name = "Iphone 12",
                Description = "Iphone 12 Description",
                Price = 20000,
                IsActive = true,
                ImageUrl = "4.jpg",
                Stock = 100
                },    
            }
        );
    }
}
