using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using UnityEngine;

public class ApiArticle {
    Server web;
    const string ENDPOINT = "api/article";


    public void Init(Server web) {
        this.web = web;
    }

    public async Task < List < ModelArticle >> GetList(ListOptions options = null) {
        ListOptions ops = options ? ? new ListOptions();
        string url = ENDPOINT + "s?skip=" + ops.skip + "&limit=" + ops.limit;

        var res = await web.Get(url);
        return res.err ? null : res.data["data"]["data"].AsArray.DeserializeList < ModelArticle > ();
    }

    public async Task < ModelArticle > Get(string id) {
        var res = await web.Get(ENDPOINT + "/" + id);
        return res.err ? null : res.data["data"].Deserialize < ModelArticle > ();
    }

    public async Task < ModelArticle > Create(ModelArticle data) {
        var res = await web.Post(ENDPOINT, data.Serialize());
        return res.err ? null : res.data["data"].Deserialize < ModelArticle > ();
    }

    public async Task < ModelArticle > Edit(ModelArticle data) {
        Debug.Log("ED: " + data.Serialize());
        var res = await web.Put(ENDPOINT + "/" + data._id, data.Serialize());
        return res.err ? null : data;
    }


    public async Task < bool > Delete(ModelArticle data) {
        return await Delete(data._id);
    }

    public async Task < bool > Delete(string id) {
        var res = await web.Delete(ENDPOINT + "/" + id);
        Debug.Log("res: " + res.data);
        return !res.err;
    }

    public async Task < List < ModelArticle >> Search(string keyword, ListOptions options = null) {
        ListOptions ops = options ? ? new ListOptions();
        string url = ENDPOINT + "s/search?skip=" + ops.skip + "&limit=" + ops.limit;

        var res = await web.Get(ENDPOINT + "&keyword="+keyword);
        return res.err ? null : res.data["data"]["data"].AsArray.DeserializeList < ModelArticle > ();
    }


    public async Task < ModelArticleFileUpload > UploadFile(ModelArticle data, string filePath) {
        return await UploadFile(data._id, filePath);
    }

    public async Task < ModelArticleFileUpload > UploadFile(string id, string filePath) {
        var res = await web.PostFile(ENDPOINT + "/" + id + "/upload", filePath, "file");
        return res.err ? null : res.data["data"].Deserialize < ModelArticleFileUpload > ();
    }




}
