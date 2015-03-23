using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Boken.Models
{
    public class RatingDTO
    {
        public int Id { get; set; }
        public int Votes { get; set; }
        public double AverageRating { get; set; }
    }
}