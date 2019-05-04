import React from 'react';
import API from "../../API";
import Axios from 'axios';
import { Loading } from "@icedesign/base";
import Spinner from '../components/Spinner';

import './MergeRequestList.css';

const spinner=(
    <Spinner/>
);

class MergeRequestList extends React.Component{


    constructor(props) {
        super(props);
        const {projectname, username} = this.props.match.params;
        const state = this.props.location.search.split('=')[1];
        this.state = {
            username: username,
            projectname: projectname,
            projectid: username + "/" + projectname,
            state:state,
            mrListInfo:[],
            loadingVisible:true,
            accessInfo:{
                access_level:0,
                visibility:"private",
            },
        }
    }

    loadAccess(){
        let url = API.code+"/projects/"+this.state.projectid+"/access";
        Axios.get(url).then(response=>{
            this.setState({
                accessInfo:response.data
            });
        });
    }

    componentWillMount(){
        let url=API.code+"/projects/"+this.state.projectid+"/merge_requests?state="+this.state.state;
        Axios.get(url).then(response=>{
            this.setState({
                mrListInfo:response.data,
                loadingVisible:false,
            });
        });
        this.loadAccess();
    }

    selectItemClass(state){
        if(state===this.state.state)
            return "mr-list-menu-item-active";
        else
            return "mr-list-menu-item";
    }

    changeState(state){
        this.props.history.push("/code/"+this.state.projectid+"/merge_requests?state="+state);
    }

    newMergeRequestLink(){
        this.props.history.push("/code/"+this.state.projectid+"/merge_requests/new");
    }

    mergeRequestLink(iid){
        this.props.history.push("/code/"+this.state.projectid+"/merge_requests/"+iid);
    }

    render(){
        const {accessInfo}=this.state;
        return (
            <div className="mr-list-container">
                <div className="div-mr-list-top">
                    <ul>
                        <li>
                            <a className={this.selectItemClass("opened")} onClick={this.changeState.bind(this,"opened")}>
                                <span>处理中</span>
                            </a>
                        </li>
                        <li>
                            <a className={this.selectItemClass("merged")} onClick={this.changeState.bind(this,"merged")}>
                                <span>已合并</span>
                            </a>
                        </li>
                        <li>
                            <a className={this.selectItemClass("closed")} onClick={this.changeState.bind(this,"closed")}>
                                <span>已关闭</span>
                            </a>
                        </li>
                    </ul>
                    {
                        (()=>{
                            if(accessInfo.access_level>=30){
                                return <button onClick={this.newMergeRequestLink.bind(this)} className="btn-new-mr">+新建合并请求</button>;
                            }
                        })()
                    }
                </div>
                <Loading visible={this.state.loadingVisible} className="loading-mr-list" tip={spinner}>
                    <div>
                        {
                            this.state.mrListInfo.map(item=>{
                                return (
                                    <div className="mr-list-item">
                                        <div className="mr-list-item-center">
                                            <div className="mr-list-item-title">
                                                <a onClick={this.mergeRequestLink.bind(this,item.iid)}>{item.title}</a>
                                            </div>
                                            <div className="mr-list-item-time">
                                                <span className="text-list-time-left">!{item.iid}&nbsp;·&nbsp;在{item.created_at}创建由&nbsp;<b>{item.created_by}</b></span>
                                                <span className="text-list-time-right">在{item.updated_at}更新</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                </Loading>
            </div>
        )
    }
}

export default (props)=><MergeRequestList {...props} key={props.location.pathname+props.location.search} />
