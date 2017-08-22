import React, {Component} from 'react'
import {IconButton} from 'material-ui'
import { ActionFavoriteBorder, ActionFavorite, ActionEvent, ImageTimer, CommunicationLocationOn } from 'material-ui/svg-icons'
import { grey500, pink500, cyan500 } from 'material-ui/styles/colors'
import {StaticMap} from '../../utils/googleMap'
import {Tweet} from 'react-twitter-widgets'
/**
 * Created by t-zikfan on 2017/7/5.
 * Meeting page Introduction Content Page
 */
function OrgPanel({talk, clickLiked, liked}) {
    const subTitleStyle = {
        fontWeight: 500
    };
    const confTitleStyle = {
        paddingLeft: '10px'
    };
    const titlePanel = (
        <div className="meeting-introduction-title-panel">
            <h1>{talk.name}</h1>
            <div className="meeting-introduction-title-subpanel">
                <a href="/"># {talk.tags ? talk.tags.join(', ') : 'Others'}</a>
                <div className="meeting-introduction-title-liks-panel">
                    <IconButton onTouchTap={clickLiked}>
                        { liked ? <ActionFavorite color={pink500}/> : <ActionFavoriteBorder color={grey500}/> }
                    </IconButton>
                    <a>{(!('likedNum' in talk) ? 0 : talk['likedNum']) + ' likes'}</a>
                </div>
            </div>
            <hr/>
        </div>
    );
    const conferencePanel = (
        <div className="meeting-introduction-conf-panel">
            <h3 style={subTitleStyle}>Related Event</h3>
            <div className="meeting-introduction-conf-title-panel">
                <ActionEvent color={cyan500}/>
                <span style={confTitleStyle}>
                    {new Date(talk.date).toLocaleString()} : <a href={talk.confLink ? talk.confLink : '/'}>{talk.cofName ? talk.confName : 'Others'}</a>
                </span>
            </div>
            <hr/>
        </div>
    );
    const desPanel = (
        <div className="meeting-introduction-des-panel">
            <h3 style={subTitleStyle}>Description</h3>
            <blockquote>
                {talk.description}
            </blockquote>
            <hr/>
        </div>
    );
    const tweetContent = talk.tweetId ? <Tweet tweetId={talk.tweetId}/> : null;
    const twitterCommentPanel = (
        <div className="meeting-introduction-twitter-panel">
            <h3 style={subTitleStyle}>Comments on twitter</h3>
            {tweetContent}
        </div>
    );
    /* map container */
    const lat = 'lat' in talk ? talk.lat : 31.2304;
    const lng = 'lng' in talk ? talk.lng : 121.4737;
    const pos = {
        lat: lat,
        lng: lng
    };
    const marker = {
        position: pos,
        key: talk.location,
        defaultAnimation: 2,
    };

    const mapPanel = (
        <div className="meeting-introduction-map-panel">
            <h3 style={subTitleStyle}>Location & Time</h3>
            <StaticMap pos={pos} marker={marker}/>
            <div className="meeting-introduction-conf-title-panel">
                <CommunicationLocationOn color={cyan500}/>
                <span style={confTitleStyle}>
                    {talk.location}
                </span>
            </div>
            <div className="meeting-introduction-conf-title-panel">
                <ImageTimer color={cyan500}/>
                <span style={confTitleStyle}>
                    {new Date(talk.date).toLocaleString()}
                </span>
            </div>
        </div>
    );
    const webPanel = (
        <div className="introduce-inner-panel">
            <div>
                {titlePanel}
                {conferencePanel}
                {desPanel}
                {twitterCommentPanel}
            </div>
            <div>
                {mapPanel}
            </div>
        </div>
    );
    const mobilePanel = (
        <div className="introduce-inner-panel-mobile">
            {titlePanel}
            {mapPanel}
            <hr style={{width: '95%'}}/>
            {conferencePanel}
            {desPanel}
            {twitterCommentPanel}
        </div>

    );
    //TODO
    return window.screen.width > 600 ? webPanel: mobilePanel;

}
export default class IntroduceContent extends Component{
    constructor(props) {
        super(props);
        this.state = {
            liked: false,
        };
        this.clickLiked = this.clickLiked.bind(this);
    }
    clickLiked() {
        const oldLiked = this.state.liked;
        this.setState({
            liked: !oldLiked
        });
    }
    render() {
        return (
            <div style={{height: 'auto'}} className="introduce-panel">
                <OrgPanel
                    talk={this.props.talk}
                    clickLiked={this.clickLiked}
                    liked={this.state.liked}
                />
            </div>
        );
    }
}