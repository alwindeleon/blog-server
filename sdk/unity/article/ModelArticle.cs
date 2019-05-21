using System;
using SimpleJSON;
using UnityEngine;

[Serializable]
public class ModelArticle {

    public string _id;

    public string createdAt;
    public string updatedAt;

     
	public string title;  
	public string excerpt;  
	public string content;  
	public string published;  
	public string created;  
	public string author_id; 

    public ModelArticle() {}

    public ModelArticle(JSONNode data) {
        this._id = data["_id"];

        this.createdAt = data["createdAt"];
        this.updatedAt = data["updatedAt"];

		 
		this.title = data["title"];  
		this.excerpt = data["excerpt"];  
		this.content = data["content"];  
		this.published = data["published"];  
		this.created = data["created"];  
		this.author_id = data["author_id"]; 
    }

    public string ToJSON() {
        //return JsonUtility.ToJson(this);
        JSONNode data = JSON.Parse("{}");

		 
		data["title"] = this.title;  
		data["excerpt"] = this.excerpt;  
		data["content"] = this.content;  
		data["published"] = this.published;  
		data["created"] = this.created;  
		data["author_id"] = this.author_id; 
	
        return data.ToString();
    }

}

[Serializable]
public class ModelArticleFileUpload {
    public string file;

    public ModelArticleFileUpload(JSONNode data) {
        this.file = data["file"];
    }
}
