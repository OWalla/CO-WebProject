using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using BookStore.DAL;
using BookStore.Models;

namespace BookStore.DAL
{
    public class StoreInitializer : System.Data.Entity.DropCreateDatabaseAlways<StoreContext>
    {
        protected override void Seed(StoreContext context)
        {
            var users = new List<User>
            {
                new User{FirstName="Simon", LastName="Ladyzhinski", Email="simon@mail.com"},
                new User{FirstName="Almog", LastName="Sadres", Email="almog@mail.com"},
                new User{FirstName="Roi", LastName="Sudai", Email="roi@mail.com"},
            };
            users.ForEach(s => context.Users.Add(s));
            context.SaveChanges();

            var books = new List<Book>
            {
                new Book{Name="Why you should NOT read books", Author="Homeless", Description="Cant say much. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt.", YearPublished=1999},
                new Book{Name="Where are we?", Author="Who am I?", Description="and Why? Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc!", YearPublished=2020},
                new Book{Name="How To End The World?", Author="Satan", 
                    Description="Have you ever wondered how you can destroy the world? NOW is your chance to learn!", 
                    YearPublished=1666},
                new Book{Name="Evil for Dummies", Author="Satan",
                    Description="Are you new to the evil-doers club, here you can learn how to be evil and fast!!", 
                    YearPublished=1990},
                new Book{Name="Spider-man", Author="Peter Parker",
                    Description="Spiderman, Spiderman, Does whatever a spider can Spins a web, any size, Catches thieves just like flies Look Out! Here comes the Spiderman. Is he strong? Listen bud, He's got radioactive blood. Can he swing from a thread Take a look overhead Hey, there There goes the Spiderman. In the chill of night At the scene of a crime Like a streak of light He arrives just in time. Spiderman, Spiderman Friendly neighborhood Spiderman Wealth and fame He's ignored Action is his reward. To him, life is a great big bang up Wherever there's a hang up You'll find the Spider man.",
                    YearPublished=1960},
                new Book{Name="Do stuff", Author="Someone", Description="How to do stuff...", YearPublished=1999}
            };
            books.ForEach(s => context.Books.Add(s));
            context.SaveChanges();

            var comments = new List<Comment>
            {
                new Comment{Title="Dont read this", Content="Do you really need a reason?", BookID=1, UserID=1},
                new Comment{Title="I didn't read this", Content="Just did what the book told me", BookID=1, UserID=2},
                new Comment{Title="Some comment title...", Content="I have nothing to say.", BookID=1, UserID=3},
                new Comment{Title="Title is't for me", Content="Some content hahasdklj aksbdkb sadkbk...", BookID=2, UserID=2}
            };
            comments.ForEach(s => context.Comments.Add(s));
            context.SaveChanges();
        }
    }
}
