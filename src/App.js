import React, { Component, useRef} from "react";
import {StyleSheet, View, Text, Image, SafeAreaView, ScrollView,TouchableOpacity } from "react-native";
import "./App.css";
//import axios from 'axios';

const css = StyleSheet.create(
{
	newslist:{position: "absolute",	overflow: "hidden",	width: "100%", height: "100%", backgroundColor: "#F4F4F4", flex: 1},
	newslistscroll:{position: "absolute",width: "100%",height: "100%",top:0,scrollBehavior: "smooth",},
	nav:{width: "100%",	height: 36,	backgroundColor: "#F4F4F4",	zIndex: 2,margin:16},
	navimg:{position: "absolute",backgroundImage: "url(img/menub.svg)",width: 20,height: 20,left: 0,top: 0},
	navtitle:{position: "absolute",width: "100%",height: 36,left: 34,top: -6,fontFamily: "Montserrat",fontStyle: "normal",fontWeight: "bold",fontSize: "28px",letterSpacing: "0.2px"},
	tabmenu:{width: "100%",height: 64,backgroundColor: "rgba(255, 255, 255, 0.8)",zIndex: 2,padding:16},
	tabmenubuttonhome:{position: "relative",width: 60,height: 40,left: -5,top: -4,},
	tabmenubuttonnews:{position: "relative",width: 60,height: 40,left: 57,top: -44,},
	tabmenubuttonimghome:{position: "relative",backgroundImage: "url(img/home.svg)",width: 20,height: 20,left: "calc(50% - 10px)",margin: "0px auto",top: 0,},
	tabmenubuttonimgnews:{position: "relative",backgroundImage: "url(img/menubl.svg)",width: 20,height: 20,left: "calc(50% - 10px)",margin: "0px auto",top: 0},
	tabmenubuttoncaptionhome:{marginTop:8,fontFamily: "Montserrat",fontSize: "11px",lineHeight: "13px",textAlign: "center",	color: "#8B959E"},
	tabmenubuttoncaptionnews:{marginTop:8,fontFamily: "Montserrat",fontSize: "11px",lineHeight: "13px",textAlign: "center", color: "#0666EB"},
	newsitem:{borderRadius: 10,marginBottom:16,	marginLeft:16,width: "calc(100% - 32px)",backgroundColor: "#FFFFFF",overflow:"hidden"},
	newsitemtitle:{width: "100%",fontFamily: "Montserrat",fontStyle: "normal",fontWeight: "bold",fontSize: "17px",lineHeight: "22px",letterSpacing: "0.2px",padding: 16,},
	newsitembody: {fontFamily: "Montserrat",fontStyle: "normal",fontSize: "15px",lineHeight: "22px",letterSpacing: "0.2px",paddingBottom: 16,paddingLeft: 16,paddingRight: 16,width: "100%"},
	newsitembottom: {position: "relative",width:"calc(100% - 32px)",height:32,left: 16,},
	newsitembottomleft: {position: "absolute",fontSize: "14px",lineHeight: "22px",color: "#8B959E",},
	newsitembottomright: {position: "absolute",	fontSize: "14px",lineHeight: "22px",height:22,right:0,color: "#FF7700",},	
	newsitembottomright_: {fontSize: "14px",lineHeight: "22px",	color: "#FF7700",},
	newsitembottomrightimg: {position: "relative",right:0,height:8,width:13,top:1}
});

const useScroll = () => {
  const elRef = useRef(null);
  const executeScroll = () => elRef.current.scrollIntoView();
  return [executeScroll, elRef];
};
const NewsItem = ({date, title, body, clamp, onpress}) => 
{
	const [executeScroll, elRef] = useScroll();

	return (
		<View style={css.newsitem} ref={elRef}>
			<Text style={css.newsitemtitle}>{title.replaceAll('<br>','')}</Text><Text style={css.newsitembody}><p className={clamp}>{body.replaceAll('<br />','').replaceAll('<br>','').replaceAll('</br>','')}</p></Text>
			<View style={css.newsitembottom}>
				<Text style={css.newsitembottomleft}>{new Date(date).toLocaleDateString()}</Text>
					<TouchableOpacity style={css.newsitembottomright} onPress={()=>{(executeScroll)();(onpress)()}} >
						<Text style={css.newsitembottomright_}>{clamp=="clamp"?"Подробнее":"Скрыть"}  <Image style={css.newsitembottomrightimg} source={clamp=="clamp"?"img/moredown.svg":"img/moreup.svg"}/></Text>
					</TouchableOpacity>
				</View>
		</View>
		);
};

class News extends Component
{
	constructor()
	{
		super();
		this.state={arr:[], clamp:{}, ref:{}};
	}
	componentDidMount()
	{
		 fetch('https://app.sm117.ru/api/v1/contract/news').then(res => res.json()).then(json => {
		  this.setState({ arr: json });
		});
	}
	onPressMore = (id) => 
	{
		const clamp=this.state.clamp;
		clamp[id]=clamp[id]=="clamp"?"":"clamp";
		this.setState({clamp:clamp});
	}
	onPressMenu = (id) => 
	{
		alert(id);
		/*const clamp=this.state.clamp;
		clamp[id]=clamp[id]=="clamp"?"":"clamp";
		this.setState({clamp:clamp});*/
	}
	clamp =(id)=>
	{
		const clamp=this.state.clamp;
		if(typeof clamp[id]==='undefined')
		{
			clamp[id]="clamp";
			this.setState({clamp:clamp});
//			return "clamp";
		}
		return clamp[id];
	}
	setref=(id)=>
	{
		const ref=this.state.ref;
		if(typeof ref[id]==='undefined')
		{
			ref[id]='true';
			this.setState({ref:ref});
		}
		return ref[id];
	}
	
	render()
	{
		const {arr}=this.state;
		return(
			<div className="News" style={css.min}>
				<SafeAreaView style={css.newslist}>
					<ScrollView style={css.newslistscroll}>
						<View style={css.nav}>
							<Image style={css.navimg}/><Text style={css.navtitle}>Новости</Text>
						</View>
						{arr.map(( item ) =>(
						<NewsItem date={item.date} title={item.title} body={item.body} onpress={this.onPressMore.bind(this, item.id)} clamp={this.clamp(item.id)}/>
						))}
						<View style={css.tabmenu}>
							<TouchableOpacity style={css.tabmenubuttonhome} onPress={this.onPressMenu.bind(this, "Кнопка домой")}>
								<Image style={css.tabmenubuttonimghome}/><Text style={css.tabmenubuttoncaptionhome}>Главная</Text>
							</TouchableOpacity>
							<TouchableOpacity style={css.tabmenubuttonnews} onPress={this.onPressMenu.bind(this, "Кнопка новости")}>
								<Image style={css.tabmenubuttonimgnews}/><Text style={css.tabmenubuttoncaptionnews}>Новости</Text>
							</TouchableOpacity>
						</View>
					</ScrollView>
				</SafeAreaView>
			</div>
		);
	}
}



export default News;
