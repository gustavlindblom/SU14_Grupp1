using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using Boken.Models;

namespace Boken.Controllers
{
    public class RatingsController : ApiController
    {
        private BookDataContext db = new BookDataContext();

        // GET: api/Ratings
        public IQueryable<RatingDTO> GetRatings()
        {
            List<RatingDTO> ratings = new List<RatingDTO>();

            foreach (Rating rating in db.Ratings)
                ratings.Add(new RatingDTO() { Id = rating.Id, Votes = rating.Votes, AverageRating = rating.TotalRating / rating.Votes });

            return ratings.AsQueryable();
        }

        // GET: api/Ratings/5
        [ResponseType(typeof(RatingDTO))]
        public IHttpActionResult GetRating(int id)
        {
            Rating rating = db.Ratings.Find(id);
            if (rating == null)
            {
                return NotFound();
            }

            return Ok(new RatingDTO() { Id = rating.Id, Votes = rating.Votes, AverageRating = rating.TotalRating / rating.Votes });
        }

        // PUT: api/Ratings/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutRating(int id, Rating rating)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != rating.Id)
            {
                return BadRequest();
            }

            var modified = db.Ratings.FirstOrDefault(x => x.Id == rating.Id);
            modified.TotalRating += rating.TotalRating;
            modified.Votes++;
            db.Entry(modified).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RatingExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Ratings
        [ResponseType(typeof(Rating))]
        public IHttpActionResult PostRating(Rating rating)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Ratings.Add(rating);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = rating.Id }, rating);
        }

        // DELETE: api/Ratings/5
        [ResponseType(typeof(Rating))]
        public IHttpActionResult DeleteRating(int id)
        {
            Rating rating = db.Ratings.Find(id);
            if (rating == null)
            {
                return NotFound();
            }

            db.Ratings.Remove(rating);
            db.SaveChanges();

            return Ok(rating);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool RatingExists(int id)
        {
            return db.Ratings.Count(e => e.Id == id) > 0;
        }
    }
}