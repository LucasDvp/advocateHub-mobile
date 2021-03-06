import React from 'react'
import {Stepper, Step, StepLabel, StepContent, IconButton, FontIcon} from 'material-ui'
import {ActionPermContactCalendar, NavigationMoreHoriz} from 'material-ui/svg-icons'
import {cyan500} from 'material-ui/styles/colors'
import * as _ from 'underscore'
import {advocateInfoClasses} from "../../styles/AdvocateInfoStyles";
/**
 * Created by t-zikunfan
 * Date: 11:39 2017/8/15
 */
export default function BioPanel({jobtitle, linkedinAccount, location, positions, summary}) {
    //console.log(linkedinAccount, jobtitle, homePage, location, positions, summary);
    const emptyPanel = (
        <div
            key="advocate_homepage_not_set"
            className={advocateInfoClasses.emptyContent}
        >
            Oops, this advocate do not bind # <a href="https://www.linkedin.com/">Linkedin</a>
        </div>
    );
    const jobTitlePanel=(
        <div>
            <h1>{jobtitle}</h1>
            <h3>@ {location}</h3>
            <hr/>
        </div>
    );
    const summaryPanel = (
        <div>
            <h3>Summary</h3>
            <blockquote>{summary}</blockquote>
            <hr/>
        </div>
    );
    const stepStyle = {
        fontSize: '16px',
        fontWeight: 'bold',
        color: cyan500
    };
    const positionsPanel = (
        <div>
            <h3>Position Detail</h3>
            <Stepper orientation="vertical">
                {_.map(positions, (position, idx) => {
                    const startDate = position.startDate.month + "/" + position.startDate.year;
                    const endDate = position.endDate ? position.endDate.month + "/" + position.endDate.year : 'Now';
                    const company = position.company.name;
                    const location = position.location.name;
                    const summary = position.summary;
                    const title = position.title;
                    return (
                        <Step key={idx}>
                            <StepLabel
                                icon={<ActionPermContactCalendar color={cyan500}/>}
                                style={stepStyle}
                            >
                                {startDate + " ~ " + endDate}
                            </StepLabel>
                            <StepContent active={true}>
                                <p className={advocateInfoClasses.bioJobContent}>{company + " @ " + summary}</p>
                                <p className={advocateInfoClasses.bioJobContent}>{title}</p>
                                <p className={advocateInfoClasses.bioJobContent}>{location}</p>
                            </StepContent>
                        </Step>
                    );
                })}
                <Step key='end-stepper'>
                    <StepLabel icon={<NavigationMoreHoriz color={cyan500}/>}
                               style={stepStyle}>
                        More Info on<IconButton onTouchTap={() => {window.location=linkedinAccount}}><FontIcon className="fa fa-linkedin-square" color="#0073b1"/></IconButton>
                    </StepLabel>
                </Step>
            </Stepper>
        </div>
    );
    const panel = (
        <div className={advocateInfoClasses.bioContentPanel}>
            {jobTitlePanel}
            {summaryPanel}
            {positionsPanel}
        </div>
    );
    const res = (
      linkedinAccount ? panel : emptyPanel
    );
    return (
        <div>
            {res}
        </div>
    );
}