namespace Boken.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Couplings : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Authors", "Book_Id", "dbo.Books");
            DropForeignKey("dbo.Genres", "Book_Id", "dbo.Books");
            DropIndex("dbo.Authors", new[] { "Book_Id" });
            DropIndex("dbo.Genres", new[] { "Book_Id" });
            DropColumn("dbo.Authors", "Picture");
            DropColumn("dbo.Authors", "Book_Id");
            DropColumn("dbo.Genres", "Book_Id");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Genres", "Book_Id", c => c.Int());
            AddColumn("dbo.Authors", "Book_Id", c => c.Int());
            AddColumn("dbo.Authors", "Picture", c => c.Binary());
            CreateIndex("dbo.Genres", "Book_Id");
            CreateIndex("dbo.Authors", "Book_Id");
            AddForeignKey("dbo.Genres", "Book_Id", "dbo.Books", "Id");
            AddForeignKey("dbo.Authors", "Book_Id", "dbo.Books", "Id");
        }
    }
}
