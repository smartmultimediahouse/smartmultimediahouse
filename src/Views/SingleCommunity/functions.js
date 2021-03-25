import { URI } from "../../Api";
import Api from "../../Api/Api";
import { sortCommunityComments } from "../../utils";

export function getComments(){
    this.setStateObj({ loader: true });
    const {userData} = this.props;
    let data = {};
    if(userData){
        data = {
            community_id: this.props.match.params.id,
            user_id: userData.user_id
        }
    } else {
        data = {
            community_id: this.props.match.params.id
        }
    }
    let payload = {
        uri:URI.GET_COMMUNITIES_COMMENTS,
        method:'post',
        data: data
    }
    Api(payload)
        .then((res)=>{
            if(res.data.length > 0){
                let comments = sortCommunityComments(res.data);
                console.log(comments);
                this.setStateObj({
                    loader:false,
                    commentsList:comments,
                    commentIdsObj:{},
                    commentsObj:{},
                    commentEdit:{}
                });
            }else{
                this.setStateObj({ loader:false });
            }
            this.forceUpdate()
        })
        .catch((err)=>{
            this.setStateObj({ loader:false });
            alert("Unkown Error "+ err)
        })
}

export function doComment(cid='', pid=0){
    let payload = {
        uri: URI.ADD_COMMUNITY_COMMENT,
        method:'post',
        data:{
            user_id:Number(this.props.userData.user_id),
            community_id: this.props.match.params.id,
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
                this.getComments();
            }else{
                this.setStateObj({ loader: false });
            }
        })
        .catch((err)=>{
            this.setStateObj({ loader:false });
            alert("Unkown Error "+ err)
        })
}

export function updateComment(){
    this.setStateObj({ loader:true })
    let payload = {
        uri:URI.UPDATE_COMMUNITY_COMMENT,
        method:'post',
        data:{
            user_id:Number(this.props.userData.user_id),
            parent_comment_id:this.state.commentEdit.parent_comment_id,
            community_id: this.props.match.params.id,
            comment_id:this.state.commentEdit.comment_id,
            comment:this.state.commentEdit.comment,
        }
    }
    Api(payload)
        .then((res)=>{
            if(res.data.message === 'success'){
                this.getComments();
            }else{
                this.setStateObj({ loader: false });
            }
        })
        .catch((err)=>{
            this.setStateObj({ loader: false });
            alert("Unkown Error \n"+ err)
        })
}



