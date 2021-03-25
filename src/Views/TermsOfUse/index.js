import React from 'react'
import Loader from '../../Components/Loader/index.js';
import './styles.css';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '../../Redux/Actions/userActions.js';
import LivePlayer from '../../Components/LivePlayer/index.js';
import SubHeader from '../../Components/SubHeader/index.js';
import Notify from '../../Components/Notify/index.js';
import { TermsOfUseBanner } from '../../constant/images.js';
import HeaderSearch from '../../Components/HeaderSearch/index.js';

class TermsOfUse extends React.Component {
    state = {
    }
    
    componentWillMount(){
    }

    setStateObj(obj){
      this.setState({ ...this.state, ...obj })
    }

    render(){
      const { loader } = this.state;

      return(<>
        {/*<HeaderSearch /> */}
        <LivePlayer banner={TermsOfUseBanner}/>
        <SubHeader />
        <Loader isLoader={loader}/>

        <div className="container">
        <div className="row">
          <div className="col-lg-12 col-sm-12">
            <h1 className="font-weight-bold terms mt-3">TERMS &amp; CONDITION</h1>
          </div>
          <div className="col-lg-12 col-sm-12">
            <p className="mt-3">Please go through this document carefully.</p>
            <p> This website ensures use of your data in accordance with our privacy policy and your use of this site is subject to the below mentioned terms and conditions. These Terms constitute a legally binding agreement between you and Lokvirsa for your usage of the Site and the services that allows for the distribution and reception of video, audio, and other content.</p>
            <p>Do not use the site if you do not agree with any of the terms contained herein:</p>
            
          </div>
          <div className="col-lg-12 col-sm-12">
            <ol className="list-group">
              <li className="list-group-item">These Terms of use apply to the Lokvirsa websites along with the organization's web pages, mobile applications, blogs, social networks, and/or other features the company provides that is accessed via Personal Computer, mobile phone or any other device(s).</li>
              <li className="list-group-item">The websites are offered by Lokvirsa. Above mentioned Terms of Use govern your rights and responsibilities in link with the websites that you are accessing. By "access" means that you are using the website by a computer or any other device(s).</li>
              <li className="list-group-item">You guarantee that you agree to the following terms and conditions set by the organization.</li>
              <li className="list-group-item">The website is targeted towards the Pakistani ("Pakistan") citizens but it can be accessed in other parts of the world. If you are not a Pakistani resident and yet access the website, you shall agree that all the terms of use are equally applicable to you and it is your responsibility to ensure that your usage of the site is according to the laws from where the website is being accessed</li>
              <li className="list-group-item">Lokvirsa reserves the right to change, modify, and/or make additions to the terms of use or the privacy policy at any time or date. If you object to any such changes, your sole option will be to stop using the Site</li>
              <li className="list-group-item">Your use of certain features, functionality, programs or Services (including contests, promotions, photo or video or other User kinds of submission to the website (uploading/posting opportunities, RSS feeds, etc.) is subjected to additional or special terms and conditions . You may be required to indicate your acceptance of such additional Special Rules before submitting any material to the organization. Different terms of use will be incorporated into these Terms.</li>
            </ol>

            <h4 className="font-weight-bold">OWNERSHIP</h4>

            <p>The content of the Lokvirsa site is owned by Lokvirsa and/or its licensors and are protected by applicable Pakistani and international copyright and other intellectual property laws.</p>

            <p>This text includes all copyrights, patents, trademarks, service marks, trade names and all other intellectual property rights.</p>
          

          <h4 className="font-weight-bold">USAGE LIMITS:</h4>
          <p>The user acknowledges and agrees that except for certain personal (non-commercial) purposes; he/she neither has nor in any way entitled to claim any rights in and about the content or part of content this site has to offer. The limits of such non-commercial usage are set forth below in the section titled LICENSES GRANTED TO YOU subject to the conditions in the USER’S RESPONSIBILITIES Section below.</p>

          <p>The user agrees not to copy, reproduce, duplicate, stream, capture, access through technology or means other than those provided on the site, perform, transfer, sell, resell, download, upload, archive, license to others, edit, modify, manipulate, create derivative works from or based upon site content, publish, republish, post, transmit, publicly display, frame, link from or to, distribute, share, embed, translate, decompile, reverse engineer, translate, incorporate into any hardware or software application use for commercial purposes, or otherwise use or exploit the site or any portion/ part of the site content thereof.</p>

          <p>Any breach of the above mentioned terms or any unauthorized uses referred to above would constitute an infringement of the copyrights and other proprietary rights of Lokvirsa and/or its licensors. Lokvirsa reserves the right to initiate legal proceedings against the offender under applicable laws.</p>

          <h4 className="font-weight-bold">LICENSES GRANTED TO YOU</h4>

          <p>Subject to these terms (including, without limitation, the YOUR RESPONSIBILITIES section set forth below), we hereby grant you up to the necessary extent functionality through this website and the following limited, revocable, non- exclusive, non-transferable, non-assignable, worldwide, royalty-free rights and licenses (each a "License").</p>

          <ol className="">
              <li className="list-group-item">You can access, view and otherwise use the website (including, without limitation any of the site services provided on or through the website) for your personal, non-commercial and legal use only.</li>
              <li className="list-group-item">You can stream content using any of the widgets and/or other digital streaming video players, if any, provided on the website (any such widget or other digital streaming internet video player referred to as a "site widget") for your personal, non-commercial and legitimate use only.</li>

              <li className="list-group-item">We hereby grant you permission to cut and paste certain code explicitly made available to you through this website (whether such functionality is designated as "sharing" or not) in order to embed, re-publish, maintain, and/or display the specific site content to which such code relates on your own personal, customized social media pages, web blogs, or microblogs (on the whole, your "personal social media").</li>

              <li className="list-group-item">You can also cut and paste certain code distinctly made available to you through the website, forward it to your friends, so that they can view our content contained therein, and/or if, they so desire, enables them to embed the forwarded piece of code on their own personal social media or re-forward it to their own friends.</li>

              <li className="list-group-item">If the website contains a "download" link next to a piece of the web-content (an image, an icon, a wallpaper, a music track, a video, a trailer, an RSS feed), you are also permitted to download a single copy of such content to a single computer, mobile or other permitted device for your personal, non-commercial and legal use only.</li>

              <li className="list-group-item">If the website enables you to download a software, the license to install and use one copy of it on your personal computer system, mobile or other permitted device in machine-executable object code form only and make an Additional copy for back- up purposes; provided, however, that you understand and agree to the following conditions.</li>
              <br/>

              <ul className="list">
                <li className="list-group-item">By allowing you to download the Software, Lokvirsa does not transfer title of that software to you (i.e., you own the medium on which the software is recorded, but the software's owner will retain its full and complete title.</li>

                <li className="list-group-item">You shall not copy, modify, adapt, translate into any language, distribute, or create derivative works based on that software without the prior written consent of Lokvirsa.</li>

                <li className="list-group-item">You shall not assign, rent, lease, or lend the software to any person or entity and any attempt by you to sublicense, transfer, or assign the software will be void and of no effect. </li>
                <li className="list-group-item">You shall not decompile, disassemble, reverse engineer, or attempt to reconstruct, identify, or discover any source code, underlying ideas, underlying user interface techniques, or algorithms of the software by any means, whatsoever, except to the extent the foregoing restriction is prohibited by applicable law.</li>
                <li className="list-group-item">Because the laws and regulations of Pakistan restrict the export and re-export of commodities and technical data of Pakistani origin, including the software(s), you will not export or re-export the software in any form in violation of the laws of Pakistan or any foreign jurisdiction.</li>
              </ul>

              <li>You have also been provided limited access to interact with other site users via comment boards and our social media pages and/or similar services available on the website.</li>
            </ol>

            <h4 className="font-weight-bold">USER’S RESPONSIBILTY</h4>

            <p>Please go through the following conditions to get conversant with policy guidelines for users.</p>

            <ol>
              <li className="list-group-item">A user/visitor/reader shall not post or submit any comment/content deemed unlawful, pornographic, obscene, defamatory, libelous, threatening, discriminatory, harassing, bullying, vulgar, indecent, profane, hateful, racially, culturally or ethnically offensive, or that encourages criminal conduct.</li>

              <li className="list-group-item">A user/visitor/reader is not entitled to embed, re-publish, maintain and/or display any Site content on any Personal Social Media or other web site or other Internet location that ordinarily contains or hosts content that is unlawful, pornographic, obscene, defamatory or ethnically offensive, or that encourages.</li>

              <li className="list-group-item">A user/visitor/reader shall abide by all copyright notices, information, and restrictions contained in or associated with any of the site content.</li>

              <li className="list-group-item">A user/visitor/reader shall not remove, alter, interfere with or circumvent any copyright, trademark or other proprietary notices marked/displayed on site content, software or site services.</li>

              <li className="list-group-item">A user/visitor/reader shall not use any of the rights granted to him/her or any of the Site content or site services in a manner that breaches its privacy.</li>

              <li className="list-group-item">A user/visitor/reader is advised not to use bots, spiders, offline readers or other automated systems to access or use the Site in a manner that sends more request messages to the site's servers in a given period of time than a human can reasonably produce in the same period by using a conventional Web browser, unless you are a lawfully operating a public search engine.</li>

              <li className="list-group-item">A user/visitor/reader shall avoid doing anything that is likely to adversely affect or reflect negatively upon or harm the goodwill or reputation of our website or any of its affiliates or any of the content running or being promoted on the site.</li>

              <li className="list-group-item">A user/visitor/reader shall not do anything on the Site that would prevent other users' access to or use of the Site or any part thereof.</li>

              <li className="list-group-item">A user/visitor/reader will be responsible for maintaining the confidentially of any username or password associated with access to the Site and you are solely responsible for all activities that occur under your username and/or password.</li>

              <li className="list-group-item">A user/visitor/reader will use the site and the licenses at all times in compliance with the aforementioned terms.</li>
            </ol>

            <h4 className="font-weight-bold">MISCELLANEOUS</h4>

            <p>Lokvirsa reserves the right to modify these terms and Conditions at any time. The conditions become effective as published on this site. Should you have any query you can contact us at the below mention address.</p>

            <h5 className="font-weight-bold">Email:</h5><p>Info@lokvirsa.tv</p>

          </div>
        </div>
        
      </div>

        <Notify { ...this.props }/>
      </>)
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(TermsOfUse);