import React, {Component} from 'react'

import {ListItem, Avatar,
    FloatingActionButton, FontIcon, Divider, List, Tab} from 'material-ui'
import { BottomSheet } from 'material-ui-bottom-sheet';
import {
    white,
    grey500,
    blue500
} from 'material-ui/styles/colors';
import {
    SocialShare,
    NavigationChevronRight,
    FileCloud
} from 'material-ui/svg-icons';
import SwipeableViews from 'react-swipeable-views';

import IntroduceContent from './meetingdetail/IntroduceContent'
import AboutContent from './meetingdetail/AboutContent'
import NotesContent from './meetingdetail/NotesContent'
import HomeBar, {homeBarHeight} from './commons/HomeBar'
import Menu, {menuHeight} from './commons/Menu'
import AHTab, {tabMenuHeight} from './commons/AHTab'
import '../styles/Meeting.css'

/**
 * Created by t-zikfan on 2017/7/3.
 * Meeting information page
 */
const meetingInfoMaxHeight = 66;
const containerMinHeight = window.screen.height - menuHeight - homeBarHeight - meetingInfoMaxHeight * 2 - tabMenuHeight;
class MeetingInfoPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            history: props.history
        }
    }
    handleAzureTouchTap = () => {
      this.state.history.push('/product/azure')
    };
    handleAdvocateTouchTap = () => {
        this.state.history.push('/advocate/johnpapa')
    };
    render() {

        const infoButton = <NavigationChevronRight/>;
        return (
            <div>
                <ListItem
                    primaryText="Quick start"
                    secondaryText="More on Microsoft Azure"
                    leftAvatar={<Avatar
                        backgroundColor={blue500}
                        icon={<FontIcon ><FileCloud color={white}/></FontIcon>}
                    />}
                    rightIcon={infoButton}
                    style={{width:"100%", minHeight: meetingInfoMaxHeight}}
                    onTouchTap={this.handleAzureTouchTap}
                />
                <hr style={{ width:'90%', margin: 0}}/>
                <ListItem
                    primaryText="Speaker : John Papa"
                    secondaryText="Subject : Deploying Angular to Azure"
                    leftAvatar={<Avatar src="../johnpapa.png"/>}
                    style={{width:"100%", minHeight: meetingInfoMaxHeight}}
                    innerDivStyle={{paddingTop: '8px'}}
                    rightIcon={infoButton}
                    className="meeting-speaker-panel"
                    onTouchTap={this.handleAdvocateTouchTap}/>
            </div>
        );

    }
}
//future will add state component
class MeetingContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slideIdx: 0
        };
        this.handleTabClick = this.handleTabClick.bind(this);
    }
    handleTabClick(value) {
        this.setState({
            slideIdx: value
        });
    }
    render() {
        const tabs = [
            <Tab label='Introduce' value={0} />,
            <Tab label='Notes' value={1} />,
            <Tab label='About' value={2} />
        ];
        const contents = [
            <IntroduceContent/>,
            <NotesContent/>,
            <AboutContent/>
        ];
        return (
            <div>
                <AHTab
                    tabs={tabs}
                    tabChangeHandler={this.handleTabClick}
                    slideIdx={this.state.slideIdx}
                    stickyHeight={homeBarHeight}
                />
                <SwipeableViews
                    index={this.state.slideIdx}
                    onChangeIndex={this.handleTabClick}
                    containerStyle={{minHeight: containerMinHeight}}
                    animateHeight={true}
                >
                    { contents }
                </SwipeableViews>
            </div>
        );
    }
}
export default class MeetingDetailPresenter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            history: this.props.history,
            isOpen: false,
        };
        this.handleShareButtonClick = this.handleShareButtonClick.bind(this);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }
    handleShareButtonClick(e) {
        this.setState({
            isOpen: true
        })
    };
    handleBackButtonClick() {
        this.state.history.push('/meetings')
    }
    render() {
        const facebookIcon = <FontIcon className="fa fa-facebook-official"/>;
        const twitterIcon = <FontIcon className="fa fa-twitter"/>;
        const googlePlusIcon = <FontIcon className="fa fa-google-plus"/>;
        /* Bottom shared sheet */
        const sharedBottomSheet = <div>
            <BottomSheet
                action={
                    <FloatingActionButton>
                        <SocialShare/>
                    </FloatingActionButton>
                }
                onRequestClose={() => this.setState({isOpen: false})}
                open={this.state.isOpen}
            >
                <h4 style={{color: grey500, marginLeft: '25px'}}>Share this meeting</h4>
                <Divider inset/>
                <List>
                    <ListItem primaryText="Facebook" leftIcon={facebookIcon}/>
                    <ListItem primaryText="Twitter" leftIcon={twitterIcon}/>
                    <ListItem primaryText="Google+" leftIcon={googlePlusIcon}/>
                </List>
            </BottomSheet>
        </div>;
        return (
            <div style={{scroll: 'hidden'}}>
                <HomeBar history={this.props.history} ref="home-app-header"/>
                <MeetingInfoPage history={this.state.history}/>
                <MeetingContent/>
                <Menu history={ this.state.history } state={0} meetingId="johnpapa_123" userId="johnpapa" />
                {sharedBottomSheet}
            </div>
        );
    }
}