import React from 'react';
import OwlCarousel from 'react-owl-carousel2';
import 'react-owl-carousel2/lib/styles.css';
import './styles.css';
import LivePlayer from '../../Components/LivePlayer/index.js';
import {
    imgPakistanBanner,
    imgPakistanPunjab,
    imgPakistanSindh,
    imgPakistanKPK,
    imgPakistanBalochistan,
    imgPakistanKashmir,
    imgPakistanGilgit,
    imgPakistanK2,
    imgPakistanBroadPeak,
    imgPakistanGasherbrum1,
    imgPakistanGasherbrum2,
    imgPakistanNangaParbat,
    imgPakistanSafariRally,
    imgPakistanMangoes,
    imgPakistanSibi1,
    imgPakistanShindur1,
    imgPakistanFolkM,
    imgPakistanRegionalM,
    imgPakistanSufiM,
    imgPakistanPopM,
    imgPakistanBalochiFood,
    imgPakistanKashmiriFood,
    imgPakistanGBFood,
    imgPakistanPunjabiFood,
    imgPakistanSindhiFood,
    imgPakistanKPFood,
    abida,
    atif,
    nusrat,
    nazia,
    sindh,
    KPK,
    balochistan,
    punjab
} from '../../constant/images';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '../../Redux/Actions/userActions.js';
import SubHeader from '../../Components/SubHeader/index.js';
import Notify from '../../Components/Notify/index.js';
import HeaderSearch from '../../Components/HeaderSearch/index.js';

class Pakistan extends React.Component {
    state = {}

    setStateObj(obj) {
        this.setState({ ...this.state, ...obj })
    }

    render() {
        const options = {
            dots: true,
            loop: true,
            autoplay: false,
            slideSpeed: 2000,
            margin: 25,
            animateOut: 'fadeOut',
            nav: false,
            navText: ["<i class=\"fa fa-angle-left\" aria-hidden=\"true\"></i>", "<i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i>"],
            responsive: {
                0: {
                    items: 1,
                },
                700: {
                    items: 1,
                },
                900: {
                    items: 2,
                },
                1200: {
                    items: 3,
                }
            }
        };

        const events = {

        };

        return (<>
            <HeaderSearch />
            <LivePlayer banner={imgPakistanBanner} />
            <SubHeader />
            {/* <div className="row">
                <div className="col-sm-8">

                </div>
                <div className="col-sm-4">

                </div>
            </div> */}
            <section className="pk-images-wrapper">
                <div className="row">
                    <div className="col-lg-5">
                        <div className="common-pk-wrapper">
                            <div className="img-wrapper">
                                <img src={imgPakistanPunjab} alt="punjab" id="myImg" />
                            </div>
                            <div className="text-wrapper">
                                <div className="text-inner-wrapper">
                                    <img src={punjab} alt="icon" />
                                    <h3>Punjab</h3>
                                    <div className="text" align="justify">Punjab is Pakistan's second largest province by area, and it is the most populated province, with rich culture &amp; hitory.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-7">
                        <div className="common-pk-wrapper">
                            <div className="img-wrapper">
                                <img src={imgPakistanSindh} alt="sindh" />
                            </div>
                            <div className="text-wrapper">
                                <div className="text-inner-wrapper">
                                    <img src={sindh} alt="icon" />
                                    <h3>Sindh</h3>
                                    <div className="text" align="justify">Sindh is in the southeast of the country, and the historical home of the Sindhi people. Sindh has Pakistan's second largest economy, while its provincial capital Karachi is Pakistan's largest city and financial hub.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-7">
                        <div className="common-pk-wrapper">
                            <div className="img-wrapper">
                                <img src={imgPakistanKPK} alt="kpk" />
                            </div>
                            <div className="text-wrapper">
                                <div className="text-inner-wrapper">
                                    <img src={KPK} alt="icon" />
                                    <h3>Khyber Pakhtunkhwa</h3>
                                    <div className="text" align="justify">located in the northwestern region of the country along the international border with Afghanistan.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5">
                        <div className="common-pk-wrapper">
                            <div className="img-wrapper">
                                <img src={imgPakistanBalochistan} alt="balochistan" />
                            </div>
                            <div className="text-wrapper">
                                <div className="text-inner-wrapper">
                                    <img src={balochistan} alt="icon" />
                                    <h3>Balouchistan</h3>
                                    <div className="text" align="justify">It is the largest province in terms of land area, forming the southwestern region of the country, but is the least populated. Its provincial capital and largest city is Quetta.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5">
                        <div className="common-pk-wrapper">
                            <div className="img-wrapper">
                                <img src={imgPakistanKashmir} alt="kashmir" />
                            </div>
                            <div className="text-wrapper">
                                <div className="text-inner-wrapper">
                                    <img src={punjab} alt="icon" />
                                    <h3>Azad Kashmir</h3>
                                    <div className="text" align="justify">Azad Kashmir is Administrative region of Pakistan situated in Northern part of the country. The northern part of Azad Jammu and Kashmir encompasses the lower part of the Himalayas, including Jamgarh Peak (15,531 feet [4,734 meters]).</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-7">
                        <div className="common-pk-wrapper">
                            <div className="img-wrapper">
                                <img src={imgPakistanGilgit} alt="gilgit-baltistan" />
                            </div>
                            <div className="text-wrapper">
                                <div className="text-inner-wrapper">
                                    <img src={punjab} alt="icon" />
                                    <h3>Gilgit Baltistan</h3>
                                    <div className="text" align="justify">Gilgit-Baltistan is admisitrative unit of Pakistan situated in the Northern Part of the country.It is one of the best tourist spots in Pakistan. Gilgit-Baltistan is home to five of the "eight-thousanders" and to more than fifty peaks above 7,000 metres (23,000 ft). Gilgit and Skardu are the two main hubs for expeditions to those mountains.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="peak-seaction-wrapper">
                <div className="site-heading">
                    <div className="container">
                        <div className="text-center">
                            <h2>Peaks</h2>
                            <div className="text" align="justify">Pakistan is home to 108 peaks above 7,000 metres and probably as many peaks above 6,000 m. There is no count of the peaks above 5,000 and 4,000 m. Five of the 14 highest independent peaks in the world (the eight-thousanders) are in Pakistan (four of which lie in the surroundings of Concordia; the confluence of Baltoro Glacier and Godwin Austen Glacier). </div>
                        </div>
                        <div className="peaksarea-tabs">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="peaksVisuals">
                                        <div className="peaksImg active" id="karakoram">
                                            <img style={{ width: "98%" }} src={imgPakistanK2} alt="Karakoram 2" />
                                        </div>
                                        <div className="peaksImg" id="broadpeak">
                                            <img style={{ width: "98%" }} src={imgPakistanBroadPeak} alt="broad peak" />
                                        </div>
                                        <div className="peaksImg" id="Gasherbrum1">
                                            <img style={{ width: "98%" }} src={imgPakistanGasherbrum1} alt="Gasherbrum 1" />
                                        </div>
                                        <div className="peaksImg" id="Gasherbrum2">
                                            <img style={{ width: "98%" }} src={imgPakistanGasherbrum2} alt="Gasherbrum 2" />
                                        </div>
                                        <div className="peaksImg" id="nangaparbat">
                                            <img style={{ width: "98%" }} src={imgPakistanNangaParbat} alt="Nanga Parbat" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="accrodionsMain">
                                        <div className="accrodionsSect active">
                                            <div className="accrodionsTitle" data-tag="karakoram">K2 <span><small>(Karakoram 2)</small></span></div>
                                            <div className="accrodionsContent" style={{ display: "block" }}>
                                                <p className="text" align="justify">K2 also known as Mount Godwin-Austen or Chhogori, at 8,611 metres (28,251 ft) above sea level, is the second highest mountain in the world, after Mount Everest at 8,848 metres (29,029 ft). It is located on the China–Pakistan border between Baltistan in the Gilgit-Baltistan region of northern Pakistan, and the Taxkorgan Tajik Autonomous County of Xinjiang, China.[4] K2 is the highest point of the Karakoram range and the highest point in both Pakistan and Xinjiang.</p>
                                            </div>
                                        </div>
                                        <div className="accrodionsSect">
                                            <div className="accrodionsTitle" data-tag="broadpeak">Broad Peak</div>
                                            <div className="accrodionsContent">
                                                <p className="text" align="justify">Broad Peak is the 12th highest mountain in the world at 8,047 metres (26,401 ft) above sea level. The literal translation of "Broad Peak" to Falchan Kangri is not used among the Balti people. The English name was introduced in 1892 by the British explorer Martin Conway, in reference to the similarly named Breithorn in the Alps</p>
                                            </div>
                                        </div>
                                        <div className="accrodionsSect">
                                            <div className="accrodionsTitle" data-tag="Gasherbrum1">Gasherbrum I</div>
                                            <div className="accrodionsContent">
                                                <p className="text" align="justify">Gasherbrum I surveyed as K5 and also known as Hidden Peak, is the 11th highest mountain in the world at 8,080 metres (26,510 ft) above sea level. It is located on the Pakistan–Chinese border and Xinjiang region of China. Gasherbrum I is part of the Gasherbrum massif, located in the Karakoram region of the Himalaya. Gasherbrum is often claimed to mean "Shining Wall", presumably a reference to the highly visible face of the neighboring peak Gasherbrum IV; but in fact it comes from "rgasha" (beautiful) + "brum" (mountain) in Balti, hence it actually means "beautiful mountain."</p>
                                            </div>
                                        </div>
                                        <div className="accrodionsSect">
                                            <div className="accrodionsTitle" data-tag="Gasherbrum2">Gasherbrum II</div>
                                            <div className="accrodionsContent">
                                                <p className="text" align="justify">Gasherbrum II surveyed as K4, is the 13th highest mountain in the world at 8,035 metres (26,362 ft) above sea level. It is the third-highest peak of the Gasherbrum massif, and is located in the Karakoram, on the border between Gilgit–Baltistan province, Pakistan, and Xinjiang, China. The mountain was first climbed on July 7, 1956, by an Austrian expedition which included Fritz Moravec, Josef Larch, and Hans Willenpart.</p>
                                            </div>
                                        </div>
                                        <div className="accrodionsSect">
                                            <div className="accrodionsTitle" data-tag="nangaparbat">Nanga Parbat</div>
                                            <div className="accrodionsContent">
                                                <p className="text" align="justify">Nanga Parbat locally known as Diamer, is the ninth highest mountain in the world at 8,126 metres (26,660 ft) above sea level. Located in the Diamer District of Pakistan’s Gilgit Baltistan region, Nanga Parbat is the western anchor of the Himalayas. The name Nanga Parbat is derived from the Sanskrit words nagna and parvata which together mean "Naked Mountain". The mountain is locally known by its Tibetan name Diamer or Deo Mir, meaning "huge mountain".</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="festivals-section">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-lg-5">
                            <div className="fastivalArea">
                                <h1 style={{ color: "green" }}><b>Festivals</b></h1>
                                <ul className="fastivaltabs">
                                    <li>
                                        <a href="/pakistan" onClick={(event) => { event.preventDefault(); }} className="active" data-tag="basant">Desert Safari Jeep Rally</a>
                                    </li>
                                    <li>
                                        <a href="/pakistan" onClick={(event) => { event.preventDefault(); }} data-tag="silk" className="">Mango Festival</a>
                                    </li>

                                    <li>
                                        <a href="/pakistan" onClick={(event) => { event.preventDefault(); }} data-tag="sibi" className="">Sibi Mela</a>
                                    </li>
                                    <li>
                                        <a href="/pakistan" onClick={(event) => { event.preventDefault(); }} data-tag="shandur" className="">Shandur Polo Festival</a>
                                    </li>
                                </ul>
                                <div className="fastivalContent basant active" id="">
                                    <h3>1. Desert Safari Jeep Rally</h3>
                                    <div className="text" align="justify">Cholistan Desert Jeep Rally started back in 2005. The event portrays a softer and positive image of Paksitan abroad.
                                    The rally covers three districts of Punjab including Rahim Yar Khan, Bahawalnagar and Bahawalpur. The prime objective to hold this event in the majestic desert of Cholistan is to show outside
								world its history and rich culture and open this area as Winter Tourist Destination.</div>
                                </div>
                                <div className="fastivalContent silk" id="">
                                    <h3>2. Mango Festival Mirpurkhas</h3>
                                    <div className="text" align="justify">The annual three-day National Mango Fruit Festival held at Mirpurkhas every year. In the festival mangoes from more than 400 orchards of Sindh are displayed.
                                    The district is known for its mangoes in the world and has been organising Mango Festival for the past 54 years. Mango is the King of all fruits whose production is higher in Sindh than other provinces.
								The main purpose of festival is to promote the local production.</div>
                                </div>
                                <div className="fastivalContent sibi" id="">
                                    <h3>3. Sibi Mela</h3>
                                    <div className="text" align="justify">Sibi lies 163 Kms. – 3 hrs. drive to the South East of Quetta at the mouth of the famous “Bolan Pass”. Sibi is famous for SIBI MELA, where tribesmen flock from all over Baluchistan, parts of Sind and Punjab with their animals.
								The salient features of this “Mela” are horse and cattle and cultural shows, tent pegging, camel races, animal markets and exhibitions of handicrafts, tribal dresses and folk dances.</div>
                                </div>
                                <div className="fastivalContent shandur" id="">
                                    <h3>4. Shandur Polo Festival</h3>
                                    <div className="text" align="justify">Passion for Polo will be the highest on the world’s highest Polo ground. Every year, Shandur (3,734 meters) invites visitors to experience a traditional polo tournament
                                    between the teams of Chitral and Gilgit from 7th to 9th July. The festival also includes folk music, folk dance, traditional sports and a camping village is be set up on the Pass. The version of game played
								at Shandur Top has attained legendary status.</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-1"></div>

                        <div className="col-lg-6">
                            <div className="row">
                                <div className="fastival-tabs-img basant active" id="">
                                    <img src={imgPakistanSafariRally} alt="basant" />
                                </div>
                                <div className="fastival-tabs-img silk" id="">
                                    <img src={imgPakistanMangoes} alt="slik-route" />
                                </div>
                                <div className="fastival-tabs-img sibi" id="">
                                    <img src={imgPakistanSibi1} alt="sibi-mela" />
                                </div>
                                <div className="fastival-tabs-img shandur" id="">
                                    <img src={imgPakistanShindur1} alt="shindur-festival" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="gallery-slider-section" id="destinations">
                <div className="container-fluid">
                    <div className="col-lg-12">
                        <h2 align="center" style={{ color: "white" }}><b>Pakistani Cuisines</b></h2>
                        <h6 align="center" style={{ color: "white" }}>Pakistani National Cuisine is the inheritor of Muslim Culinary Traditions and known for having aromatic and sometimes spicy flavors. Pakistani Cuisine is divide into wider range of Regional Cuisine.
					    i.e. Punjabi Cuisine, Sindhi Cuisine, Pashtun Cuisine, Balochi Cuisine, Hunza Diet, Kashmiri Cuisine and Balti Food.</h6>
                    </div>
                    <div className="gallery-wrapper-container">
                        <OwlCarousel options={options} events={events} >
                            <div>
                                <img src={imgPakistanBalochiFood} style={{ border: "5px solid", borderColor: "white", borderRadius: "1pc", marginRight: 25 }} alt="shindur-festival" />
                                <h4 style={{ color: "white" }} align="center">Balochi Cuisine</h4>
                            </div>
                            <div>
                                <img src={imgPakistanKashmiriFood} style={{ border: "5px solid", borderColor: "white", borderRadius: "1pc", marginRight: 25 }} alt="shindur-festival" />
                                <h4 style={{ color: "white" }} align="center">Kashmiri Cuisine</h4>
                            </div>
                            <div>
                                <img src={imgPakistanGBFood} style={{ border: "5px solid", borderColor: "white", borderRadius: "1pc", marginRight: 25 }} alt="shindur-festival" />
                                <h4 style={{ color: "white" }} align="center">Gilgit-Baltistan Cuisine</h4>
                            </div>
                            <div>
                                <img src={imgPakistanPunjabiFood} style={{ border: "5px solid", borderColor: "white", borderRadius: "1pc", marginRight: 25 }} alt="shindur-festival" />
                                <h4 style={{ color: "white" }} align="center">Punjabi Cuisine</h4>
                            </div>
                            <div>
                                <img src={imgPakistanSindhiFood} style={{ border: "5px solid", borderColor: "white", borderRadius: "1pc", marginRight: 25 }} alt="shindur-festival" />
                                <h4 style={{ color: "white" }} align="center">Sindhi Cuisine</h4>
                            </div>
                            <div>
                                <img src={imgPakistanKPFood} style={{ border: "5px solid", borderColor: "white", borderRadius: "1pc", marginRight: 25 }} alt="shindur-festival" />
                                <h4 style={{ color: "white" }} align="center">Pushton Cuisine</h4>
                            </div>
                        </OwlCarousel>
                    </div>
                </div>
            </section>
            <section className="festivals-section">
                <div className="container-fluid">
                    <div className="row align-items-center">

                        <div className="col-lg-5">
                            <div className="fastivalArea">
                                <h1 style={{ color: "green" }}><b>Music</b></h1>
                                <ul className="fastivaltabs">
                                    <li>
                                        <a href="/pakistan" onClick={(event) => { event.preventDefault(); }} className="active" data-tag="shandur">Folk Music</a>
                                    </li>
                                    <li>
                                        <a href="/pakistan" onClick={(event) => { event.preventDefault(); }} data-tag="sibi">Regional Music</a>
                                    </li>

                                    <li>
                                        <a href="/pakistan" onClick={(event) => { event.preventDefault(); }} data-tag="silk">Sufism</a>
                                    </li>
                                    <li>
                                        <a href="/pakistan" onClick={(event) => { event.preventDefault(); }} data-tag="basant">Popular Music</a>
                                    </li>
                                </ul>
                                <div className="fastivalContent shandur active" id="">
                                    <h3>1. Folk / Classical Music</h3>
                                    <div className="text" align="justify">The devotional form of music most commonly founded in the Sufi Culture in South Asia. Sufi Music originated from the inspirational work of Sufi Poets like Rumi, Bulleh Shah and others.
								Distinct musical styles, singing and ceremonies have emerged over time, often unique to the local culture, but all unified under the purpose of creating this altered state of spiritual awareness.</div>
                                </div>
                                <div className="fastivalContent sibi" id="">
                                    <h3>2. Regional Music</h3>
                                    <div className="text" align="justify">Regional Music in Pakistan gives a huge diversity to music and traditions of different regions in Pakistan as all regions have variety of people and tribes talk in many different languages.
								Famous singers include Alam Lohar form Punjab, Allan Fakir form Sindh, Zarsanga from Khyber Pakhtunkhwa, Akhtar Chanal Zahri form Balochistan and Shahid Akhtar Qalandar form Hunza, GB.</div>
                                </div>
                                <div className="fastivalContent silk" id="">
                                    <h3>3. Sufism</h3>
                                    <div className="text" align="justify">Sufism has an exceptional official rule as one of the most important genres of music in Pakistan. The purpose is get the artist and audience closer to Allah by repeating the trance-like words. It has many forms like
								Qawwali, Ghazal etc. perfomed by various artists in Pakistan i.e. Ustad Nusrat Fateh Ali Khan, Abida Parveen and Shazia Khushk and others.</div>
                                </div>
                                <div className="fastivalContent basant" id="">
                                    <h3>4. Popular Music</h3>
                                    <div className="text" align="justify">Pakistani pop is a mixture of traditional Pakistani classical music and western influences of jazz, rock and roll, hip hop and disco sung in various languages of Pakistan, including Urdu.
								Pakistani pop musicians like Ahamed Rushdi, Nazia Hassan &amp; Zeb Hassan, Atif Aslam and others have achieved an influential following and popularity in neighboring countries.	</div>
                                </div> <br />
                            </div>
                        </div>
                        <div className="col-lg-1"></div>

                        <div className="col-lg-6">
                            <div className="row">
                                <div className="fastival-tabs-img shandur active" id="">
                                    <img src={imgPakistanFolkM} alt="shindur-festival" />
                                </div>
                                <div className="fastival-tabs-img sibi" id="">
                                    <img src={imgPakistanRegionalM} alt="sibi-mela" />
                                </div>
                                <div className="fastival-tabs-img silk" id="">
                                    <img src={imgPakistanSufiM} alt="slik-route" />
                                </div>
                                <div className="fastival-tabs-img basant" id="">
                                    <img src={imgPakistanPopM} alt="basant" />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
            <div className="col-12">
                <div className="row">
                    <div id="trans" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <div className="text-center p-4">
                            <center> <h2 style={{ color: "green" }}>Music</h2></center>
                            <p style={{ color: "#cfcfcf", fontSize: 16 }}>Music od includes diverse elements ranging from music from various part of south Asia as
                                well as central Asian,Middle Eastern and modern-day Western popular music influences.With multiple informations, a distinctive Pakistani sound has emerged</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12">
                <div className="row" style={{ background: "#e5e5e5" }}>
                    <div className="col-md-6 col-lg-3 col-sm-12">
                        <center>
                            <img src={abida} style={{ borderRadius: "60%", width: 210, height: 210, border: "2px solid #19b24b" }} className="mt-5 " alt="Abida" />
                        </center>
                        <div className="row">
                            <div className="offset-md-1 col-md-10">
                                <center>
                                    <h5 style={{ color: "green" }} className="mt-1" > Abida Parveen</h5>
                                    <p> is a Pakistani Sufi Muslim singer,composer and musician. She is also a painter and entrepreneur.Her singing and music has earned her many accolades, and she has been dubbed as the 'Queen of Sufi music'.</p></center>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3 col-sm-12">
                        <div className="row">
                            <div className="offset-md-1 col-md-10">
                                <center className="mt-5">
                                    <p> was a Pakistani pop singer-songwriter.She enjoyed widespread popularity across South and Southeast Asia and has been called the "Queen of Pop" in South Asia</p>
                                    <h5 style={{ color: "green" }} className="mt-1">Nazia Hassan</h5>
                                </center>
                            </div>
                        </div>
                        <center>
                            <img src={nazia} style={{ borderRadius: "60%", width: 210, height: 210, border: "2px solid #19b24b" }} className="mt-1" alt="Nazia" />
                        </center>
                    </div>
                    <div className="col-md-6 col-lg-3 col-sm-12">
                        <center> <img src={nusrat} style={{ borderRadius: "60%", width: 210, height: 210, border: "2px solid #19b24b" }} className="mt-5" alt="Nusrat" />
                        </center>
                        <div className="row">
                            <div className="offset-md-1 col-md-10">
                                <center>
                                    <h5 style={{ color: "green" }} className="mt-1">Nusrat Fateh Ali Khan</h5>
                                    <p> was a Pakistani vocalist, musician and music director primarily a singer of Qawwali, a form of Sufi Islamic devotional music.[1] Widely considered one of the greatest voices ever recorded.</p></center>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3 col-sm-12">
                        <div className="row">
                            <div className="offset-md-1 col-md-10">
                                <center className="mt-5">
                                    <p>  is a Pakistani playback singer and actor. He has recorded numerous chart-topping songs[4] in both Pakistan and India and is known for his vocal belting technique</p>
                                    <h5 style={{ color: "green" }} className="mt-1">Atif Aslam</h5>
                                </center>
                            </div>
                        </div>
                        <center> <img src={atif} height="150px" style={{ borderRadius: "60%", width: 210, height: 210, border: "2px solid #19b24b" }} className="mt-1" alt="Atif" />
                        </center>
                    </div>
                </div>
            </div>
            <Notify {...this.props} />
        </>)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pakistan);