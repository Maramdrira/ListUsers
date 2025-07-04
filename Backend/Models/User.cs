using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace list.Models
{

    // In Models/User.cs
    public class User
    {
        public int Id { get; set; }

        [Required] // Add data annotation
        public string Username { get; set; } = string.Empty; // Initialize with default

        [Required]
        public string Password { get; set; } = string.Empty;

        [Required]
        [EmailAddress] // Add email validation
        public string Email { get; set; } = string.Empty;

        [Column(TypeName = "datetime")]
        public DateTime CreatedAt { get; set; }
        }
    
}
