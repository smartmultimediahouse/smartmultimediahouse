import { URI } from "../../Api";
import Api from "../../Api/Api";
import { isObjEmpty, sortComments } from "../../utils";

export function getComments(vid=this.state.playVideo.videos_id){
    this.setStateObj({ loader: true });
    let payload = {
        uri:URI.GET_COMMENTS,
        method:'post',
        data:{
            user_id:Number(this.props.userData.user_id),
            v_id:vid
        }
    }
    Api(payload)
        .then((res)=>{
            let comments = sortComments(res.data)
                this.setStateObj({
                    loader:false,
                    commentsList:comments,
                    commentIdsObj:{},
                    commentsObj:{},
                    commentEdit:{}
                });
            this.forceUpdate()
        })
        .catch((err)=>{
            this.setStateObj({ loader:false });
            alert("Unkown Error "+ err)
        })
}

export function doComment(vid, cid='', pid=0){
    let payload = {
        uri:URI.DO_COMMENTS,
        method:'post',
        data:{
            user_id:Number(this.props.userData.user_id),
            v_id:vid,
            parent_comment_id:pid,
            comment:this.state.commentsObj[cid]
        }
    }
    this.setStateObj({ loader:true, commentsObj:{} })
    Api(payload)
        .then((res)=>{
            if(res.data.message === 'success'){
                if(cid !== ''){
                    document.getElementById(cid).value = '';
                }
                
                this.getComments(vid);
            }else{
                this.setStateObj({ loader: false });
            }
        })
        .catch((err)=>{
            this.setStateObj({ loader:false });
            alert("Unkown Error "+ err)
        })
}

export function deleteComment(cid){
    this.setStateObj({ loader:true })
    if(!window.confirm('Are you sure you want to delete this comment?')) {
        return
    }
    let payload = {
        uri:URI.VIDEO_COMMENT_DEL,
        method:'post',
        data:{
            user_id:Number(this.props.userData.user_id),
            vcomment_id:cid,
        }
    }
    Api(payload)
        .then((res)=>{
            if(res.data.message === 'success'){
                this.getComments(this.state.playVideo.videos_id);
            }else{
                this.setStateObj({ loader: false });
            }
        })
        .catch((err)=>{
            this.setStateObj({ loader: false });
            alert("Unkown Error "+ err)
        })
}

export function updateComment(){
    this.setStateObj({ loader:true })
    let payload = {
        uri:URI.UPDATE_VIDEO_COMMENT,
        method:'post',
        data:{
            user_id:Number(this.props.userData.user_id),
            parent_comment_id:this.state.commentEdit.parent_comment_id,
            v_id:this.state.playVideo.videos_id,
            vcomment_id:this.state.commentEdit.vcomment_id,
            comment:this.state.commentEdit.comment,
        }
    }
    Api(payload)
        .then((res)=>{
            if(res.data.message === 'success'){
                this.getComments(this.state.playVideo.videos_id);
            }else{
                this.setStateObj({ loader: false });
            }
        })
        .catch((err)=>{
            this.setStateObj({ loader: false });
            alert("Unkown Error \n"+ err)
        })
}

export function doCommentLikeDisLike(data, is_like='1'){
    if(isObjEmpty(this.props.userData) || !this.props.isLoggedIn){
        this.props.setAuthModal(true);
        return;
    }
    this.setStateObj({ loader: true });
    let payload = {
        uri: URI.COMMENT_LIKE_DISLIKE,
        method:'post',
        data:{
            member_id: Number(this.props.userData.user_id),
            comment_id:data.vcomment_id,
            like_unlike:is_like
        }
    }
    Api(payload)
        .then((res)=>{
            if(res.data.message === "error"){
                alert(res.data.data)
            }
            this.getComments()
        })
        .catch((err)=>{
            alert("Unkown Error "+ err)
        })
}

export function doVideoLikeDisLike(data, is_like=1, already_liked='none'){
    const { playVideo } = this.state
    this.setStateObj({ loader: true });
    if(isObjEmpty(this.props.userData) || !this.props.isLoggedIn){
        this.props.setAuthModal(true);
        return;
    }
    let payload = {
        uri: URI.VIDEO_LIKE_DISLIKE,
        method:'post',
        data:{
            user_id: Number(this.props.userData.user_id),
            video_id:data.videos_id,
            like_dislike:is_like
        }
    }
    Api(payload)
        .then((res)=>{
            if(res.data.message === "success"){
                console.log(already_liked);
                if(already_liked === 'false'){
                    playVideo['total_dislikes'] = playVideo['total_dislikes'] - 1;
                } else if(already_liked === 'true'){
                    playVideo['total_likes'] = playVideo['total_likes'] - 1;
                }
                
                if(is_like === 1){
                    playVideo['is_user_like'] = true;
                    playVideo['total_likes'] = res.data.total_likes;
                }
                if(is_like === -1){
                    playVideo['is_user_like'] = false;
                    playVideo['total_dislikes'] = res.data.total_dislikes;
                }
            }
            this.setStateObj({ loader:false })
        })
        .catch((err)=>{
            this.setStateObj({ loader: false });
            alert("Unkown Error "+ err)
        })
}

export function addFavorite(data, is_favourite=false){
    this.setStateObj({ loader: true });
    if(isObjEmpty(this.props.userData) || !this.props.isLoggedIn){
        this.props.setAuthModal(true);
        return;
    }
    let payload = {
        uri:is_favourite ? URI.RM_FAVORITE : URI.ADD_FAVORITE,
        method:'post',
        data:{
            user_id: Number(this.props.userData.user_id),
            videos_id:data.videos_id
        }
    }
    Api(payload)
        .then((res)=>{
            this.props.setNotify({ isShow:true, msg:res.data.message, title:res.data.status === "success" ? 'Success' : 'Failed' })
            setFavorite(data.videos_id, is_favourite)
            this.setStateObj({ loader: false });
        })
        .catch((err)=>{
            this.setStateObj({ loader: false });
            alert("Unkown Error "+ err)
        })
}

export function getWatchLater() {
    if(JSON.parse(window.localStorage.getItem("watchLater")) === null ){
        return []
    }else {
    return JSON.parse(window.localStorage.getItem("watchLater"));
    }
}

export function setWatchLater(videoId, is_watch_later) {
    var temp = getWatchLater();
    if(!is_watch_later){
        if(!temp.includes(videoId)){
        temp.push(videoId);
        window.localStorage.setItem("watchLater", JSON.stringify(temp));
        }
    } else {
        temp.splice(temp.indexOf(videoId), 1);
        window.localStorage.setItem("watchLater", JSON.stringify(temp));
    }    
}

export function getFavorite() {
    if(JSON.parse(window.localStorage.getItem("favorite")) === null ){
        return []
    }else {
    return JSON.parse(window.localStorage.getItem("favorite"));
    }
}

export function setFavorite(videoId, is_favourite) {
    var temp = getFavorite();
    if(!is_favourite){
        if(!temp.includes(videoId)){
        temp.push(videoId);
        window.localStorage.setItem("favorite", JSON.stringify(temp));
        }
    } else {
        temp.splice(temp.indexOf(videoId), 1);
        window.localStorage.setItem("favorite", JSON.stringify(temp));
    }    
}

export function addInWatchLater(data, is_watch_later=false){
    if(isObjEmpty(this.props.userData) || !this.props.isLoggedIn){
        this.props.setAuthModal(true);
        return;
    }
    this.setStateObj({ loader: true });
    let payload = {
        uri: is_watch_later ? URI.REMOVE_WATCH_LATER : URI.ADD_WATCH_LATER,
        method:'post',
        data:{
            user_id: Number(this.props.userData.user_id),
            video_id:data.videos_id
        }
    }
    if(is_watch_later){
        payload['data']['wish_list_id'] = data.wish_list_id
    }
    Api(payload)
        .then((res)=>{
            // if(res.data.message === "success"){
            //     data['is_watch_later'] = !is_watch_later;
            //     alert(res.data.data)
            // }
            this.props.setNotify({ isShow:true, msg:res.data.data, title:res.data.message === "success" ? 'Success' : 'Failed' })
            setWatchLater(data.videos_id, is_watch_later)
            this.setStateObj({ loader: false });
        })
        .catch((err)=>{
            this.setStateObj({ loader: false });
            alert("Unkown Error "+ err)
        })
}

