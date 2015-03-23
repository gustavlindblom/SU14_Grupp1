using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Boken.Models
{
    public class Rating
    {
        public int Id { get; set; }
        public double TotalRating { get; set; }
        public int Votes { get; set; }
    }
}