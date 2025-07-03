using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace list.Models
{

        public class User
        {
            public int Id { get; set; }
            public string Username { get; set; }
            public string Password { get; set; }
            public string Email { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime CreatedAt { get; set; }
        }
    
}
