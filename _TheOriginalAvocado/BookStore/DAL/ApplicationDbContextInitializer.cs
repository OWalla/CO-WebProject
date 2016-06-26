using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using BookStore.Models;

namespace BookStore.DAL
{
    public class ApplicationDbContextInitializer : System.Data.Entity.DropCreateDatabaseAlways<ApplicationDbContext>
    {
        protected override void Seed(ApplicationDbContext context)
        {
            var users = new List<ApplicationUser>
            {
                new ApplicationUser{Id="2aa965c0-5c69-4dba-ade9-7e20656da985", IsAdmin=true, Email="suda@suda.com", EmailConfirmed=false,PasswordHash="ADndsJNhESgtr/XbXbRUNhxuwlxBxGQrfPkQou5m92MexfBTx+FFo7MOjBcdQfpxzQ==", SecurityStamp="6d00718d-c3d2-4f7e-a006-35ac7cc7e7e4", PhoneNumber=null,PhoneNumberConfirmed=false,TwoFactorEnabled=false,LockoutEnabled=true,AccessFailedCount=0,  UserName="suda@suda.com"},
                new ApplicationUser{Id="e4fcc54c-5049-4f6d-b6ee-ee55794a6cb1", IsAdmin=true, Email="simon@simon.com", EmailConfirmed=false,PasswordHash="ABbE69lfmHs2+ROOoROKc2kyDkWAbtJAeeZhQe7Y5gvWTfWNgcyLO2CV4EwKaV8/BQ==", SecurityStamp="10e8767d-fd7e-4d36-8f8e-11e8edc002f7", PhoneNumber=null,PhoneNumberConfirmed=false,TwoFactorEnabled=false,LockoutEnabled=true,AccessFailedCount=0,  UserName="simon@simon.com"},
                new ApplicationUser{Id="e6e11134-9e30-4fd2-8577-967ba578d322", IsAdmin=true, Email="almog@almog.com", EmailConfirmed=false,PasswordHash="AIfkWxPgSuTQFry1FENXFVqeNTFSE6STOPTUDG1mQKhNeB3YjL1qhb3XSUfkjSkXHw==", SecurityStamp="aef047dc-aa15-48b8-bcac-7d22f9e644e7", PhoneNumber=null,PhoneNumberConfirmed=false,TwoFactorEnabled=false,LockoutEnabled=true,AccessFailedCount=0,  UserName="almog@almog.com"},
            };
            users.ForEach(s => context.Users.Add(s));
            context.SaveChanges();
        }
    }
}
