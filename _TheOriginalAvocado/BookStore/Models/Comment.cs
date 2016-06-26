using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace BookStore.Models
{
    public class Comment
    {
        [Key]
        public int ID { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public int UserID { get; set; }
        public int BookID { get; set; }
        public virtual User User { get; set; }
        public virtual Book Book { get; set; }
    }
}