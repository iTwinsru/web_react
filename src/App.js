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
		this.state={arr:[{"id":123,"date":"2021.01.12","title":"Новые вакансии","body":"«Сибирский медведь» - одна из самых крупных компаний в Сибири, а также одна из ведущих на рынке широкополосного доступа в интернет, интерактивного телевидения и камер видеонаблюдения в частном секторе.<br />\n<br />\nВ настоящее время у нас открыта позиция Менеджера территории.<br />\n<br />\nОбязанности:<br />\n<br />\nСбор заявок на подключение интернета и видеонаблюдения в частном секторе (почти полное отсутствие конкуренции);<br />\nВедение и предоставление отчетности руководителю;<br />\nПриём тёплых звонков от потенциальных абонентов.<br />\n<br />\nТребования:<br />\nКоммуникабельность, позитивный настрой, активная жизненная позиция;<br />\nЖелание зарабатывать и показывать результат;<br />\nСтремление расти и развиваться как профессионально, так и личностно.<br />\n<br />\nУсловия:<br />\nГрафик работы 5/2 с плавающими выходными;<br />\nРабота в офисе и на территории (50/50);<br />\nОклад + высокие ставки за подключения + премии;<br />\nВозможность профессионального и карьерного роста в компании;<br />\nСвоевременная зарплата, которая зависит от результатов работы.<br />\nЗвоните или пишите 8-913-953-46-06<br />\n<br />\n<br />"},{"id":122,"date":"2021.01.01","title":"«Сибирский медведь» искренне поздравляет Вас с наступившим Новым Годом!<br>","body":"Поздравляем Вас с этим волшебным праздником и желаем Вам процветания в делах, благополучия в личной жизни и здоровья!<br>\nПусть в 2021 году Вас ждут только приятные сюрпризы, отличные новости, удача и успех, а коллеги, друзья, любимые и близкие люди радуют Вас своей поддержкой и надежным плечом.<br>\nЖелаем вам покоя, счастья, уюта и тепла! <br> Спасибо что Вы с нами! <br>"},{"id":121,"date":"2020.12.31","title":"Внимание! Новогодний конкурс!","body":"Уважаемые абоненты!<br>\nПо нашей многолетней традиции мы проводим творческий новогодний конкурс «Праздники с Медведем». <br>\n<br>\nВ конкурсе могут принять участие ВСЕ абоненты компании. Победителей будет 5, подарки от «Сибирского медведя» будут разыграны 13 января, а теперь подробнее об условиях конкурса:<br>\n<br>\n«Лучший рисунок» <br>\nНарисовать картину - любого размера, в любой технике, из любых материалов. На картине обязательно должен находиться символ нашей компании, медведь. Остальные детали – на усмотрение художника и ограничиваются исключительно его фантазией.<br>\nОтсканированный рисунок или его фото должно быть загружено в альбом нашей группы ВК https://vk.com/album-57120060_276669476 не позднее 23:59 07.01.2021 г.<br>\nВ названии загруженного файла необходимо указать фамилию и имя художника и ваш номер лицевого счета.<br>\n<br>\nПять победителей определит экспертное жюри «Сибирского медведя».<br>\n<br>\nИтоги новогодних конкурсов «Праздники с медведем» подведем 13 января 2021 года и опубликуем на нашей странице в ВКонтакте.<br>\n<br>\nПодарки победителям в соответствии с занятым местом:<br>\n<br>\n1 – ТВ приставка<br>\n2 – Камера видеонаблюдения «Дозор»<br>\n3 – 3000 рублей на лицевой счет<br>\n4 – 2000 рублей на лицевой счет<br>\n5 – 1000 рублей на лицевой счет<br>\n<br>\nДля вручения заслуженной награды мы свяжемся с вами по номеру телефона, указанному в вашем договоре на предоставление услуг связи.<br>\n«Сибирский Медведь» ждет ваши работы!<br>"},{"id":111,"date":"2020.12.15","title":"Ищем менеджера","body":"«Сибирский медведь» открывает кастинг на вакансию менеджера по продажам. Люди нужны в Новосибирск и Бердск.\n<img src=\"/files/pictures/images/sell_pp.jpg\" />\nМенеджер собирает заявки на подключение к интернету и видеонаблюдению на территории частного сектора, а также ведет отчетность о проделанной работе.<br /><br />\n\nМожно без опыта, научим и общаться и продавать. Даже с совсем-совсем нуля.<br />\nКоммуникабельные, позитивные и желающие зарабатывать - добро пожаловать.<br /><br />\n\nПочему работать с \"Сибирским медведем\" будет классно:<br /><br />\n\nОклад + %, которые зависят от результатов, платим вовремя.<br />\nОбучение технике продаж.<br />\nУдобный график с возможностью совмещать с учебой или другой работой.<br />\nПремии по результатам работы.<br />\nОплачиваемая стажировка.<br /><br />\n\nЗвоните или пишите 8-913-953-46-06<br /><br />"},{"id":113,"date":"2020.11.19","title":"Ваши отзывы помогают нам становиться лучше! Нам важно каждое мнение!","body":"Уважаемые Абоненты!<br>\nВаши отзывы помогают нам становиться лучше! Нам важно каждое мнение!<br>\nПоэтому мы приняли решение продлить нашу акцию \"Оставь отзыв - заработай бонус!\"<br>\nУсловия остались прежними - Напишите Ваш правдивый отзыв с любой оценкой о нашей работе на сервисе Flamp (https://clck.ru/Qq4mu )и получи бонус - 3 дня интернета в подарок!!!<br>\nВ отзыве необходимо указать номер вашего лицевого счета.<br>\nБонус начисляется один раз на указанный в отзыве номер договора.<br>\nСрок зачисления бонуса - 5 рабочих дней (не забывайте в отзыве указать номер договора!)<br>\nСрок проведения акции до 31.01.2021<br>"},{"id":110,"date":"2020.10.23","title":"Ищем бригаду подключения","body":"Требуется монтажник подключений абонентов (ВОЛС) и инсталятор оборудования в г. Новосибирск.<br /><br />\n<strong>Обязанности:</strong><br />\nМонтаж абонентских линий связи в частном секторе (технология GEPON);<br />\nРемонт абонентских линий связи;<br />\nУстановка и настройка абонентского оборудования (GEPON терминалы, IPTV STB, Роутеры);<br />\nМонтаж видеонаблюдения.<br /><br />\n<strong>Требования:</strong><br />\nОпыт работы в смежных областях;<br />\nПродвинутый пользователь ПК.<br /><br />\n<strong>Условия:</strong><br />\nработа в бригаде из 2-х человек<br />\nналичие л/а<br />\nГотовность использовать автомобиль по работе<br />\nОфициальное трудоустройство;<br />\nГрафик работы 5/2 (плавающие выходные);<br />\nОплата бензина и амортизация;<br />\nПрофессионального роста;<br />\nКомпания предоставляет все необходимое для работы (рабочий инструмент, спец. одежду и т.д.).<br />\n<strong>Зарплата до 80 т.р.</strong><br />\nКонтакты: +7-952-907-81-54<br /><br />"},{"id":107,"date":"2020.09.14","title":"\"Оставь отзыв - заработай бонус!\"","body":"Уважаемые Абоненты!</br>\nНам очень важно ваше мнение о нас! Поэтому мы запускаем акцию - \"Оставь отзыв - заработай бонус!\"<br>\nНапишите Ваш правдивый отзыв с любой оценкой о нашей работе на сервисе Flamp (https://clck.ru/Qq4mu) и получи бонус - 3 дня интернета в подарок!!!<br>\nВ отзыве необходимо указать номер вашего лицевого счета.<br>\nБонус начисляется один раз на указанный в отзыве номер договора.<br>\nСрок зачисления бонуса - 5 рабочих дней (не забывайте в отзыве указать номер договора!)<br>\nСрок проведения акции до 31.10.2020<br>"},{"id":104,"date":"2020.07.22","title":"Внимание!","body":"Мы интернет провайдер Сибирский Медведь<br>\nПриглашаем активных людей, желающих развиваться и зарабатывать<br>\nЛюбишь гаджеты и разбираешься в новинках телекоммуникационной сферы?<br>\nСвободно общаешься с людьми и умеешь убеждать?<br>\nНацелен зарабатывать и развиваться в крупной компании?<br>\nТогда тебе – к нам! Стань частью нашей большой семьи!<br><br>\n<br> info@sm117.ru <br>"},{"id":98,"date":"2020.05.14","title":"Уважаемые абоненты!","body":"Дополнительные пакеты ТВ, включенные на время самоизоляции, с 18.05.2020 будут закрыты. </br>\nДля того что бы продолжить смотреть дополнительные пакеты ТВ, подключите их по следующей ссылке: <a href=\"https://sb117.ru/cabinet/packages\">ТВ пакеты</a></br>\n</br>"},{"id":93,"date":"2020.05.12","title":"Срочная новость о плановых работах","body":"Уважаемые Абоненты! <br>\n14 мая 2020 года с 01:00 до 10:00 по новосибирскому времени в связи с проведением масштабных плановых работ на сети будет недоступен наш сайт и  контактный центр.  <br>\n! Абонентам Новосибирска будут недоступны все услуги ! <br>\nМы приложим максимум усилий для того, чтобы работы были завершены максимально быстро! <br>\nПриносим извинения за доставленные неудобства и надеемся на Ваше понимание! <br>"}],
					clamp:{},
					ref:{}};
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
