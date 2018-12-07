import {StockPricesService} from './../stock-prices.service';
import {Chart} from 'chart.js';
import { forEach } from '@angular/router/src/utils/collection';
import { TimerObservable } from "rxjs/observable/TimerObservable";
import {AfterViewInit, OnInit, Component, Directive, QueryList, ViewChildren, ElementRef} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
// import { DataTableModule } from 'angular-4-data-table';



import 'rxjs/add/operator/takeWhile';
import set = Reflect.set;
import {Router} from "@angular/router";
import {routerNgProbeToken} from "@angular/router/src/router_module";
import {UserDataService} from "../user-data.service";

declare var require: any




@Component({
  selector: 'app-stock-api',
  templateUrl: './stock-api.component.html',
  styleUrls: ['./stock-api.component.scss']
})




export class StockApiComponent implements OnInit {

  chart=[];

  rootNode:any
  i=0;
  portfolio = [] ;
  user: any;
  staticData: any;
  dates= [];
  symbol = [];
  closedprice=[];

  errorMsg: string;
  chartArray = [];
  symbolArray = [];
  length=[];
  stockList=[];
  search="";
  cryptoList=["BTC","ETH","XRP","BCH"];
  priceChange: any;
  private ngtabledata: any[];
  selectedEntities: any[];

  private display: boolean; // whether to display info in the component
  // use *ngIf="display" in your html to take
  // advantage of this

  private alive: boolean; // used to unsubscribe from the TimerObservable
                          // when OnDestroy is called.
  private interval: number;



  constructor(private _stockService: StockPricesService, private router: Router, private _userservice: UserDataService) {

    this.display = false;
    this.alive = true;
    this.priceChange=0;
    this.interval = 30000;


  }



  sortByQuantity()
  {

    console.log("Portfolio at the beginning of the sort is ",this.portfolio);

    let array = Object.assign([], this.portfolio);
    console.log("Portfolio at the beginning of the sort is ",array);
    for(let i = 0; i < array.length; i++) {
      for(let j = 0; j < array.length - 1; j++) {


        if(array[j].quantity > array[j + 1].quantity) {
          let swap = array[j];
          array[j] = array[j + 1];
          array[j + 1] = swap;
        }
      }
    }


    this.portfolio=array;
    console.log("Portfolio after sorting is ",this.portfolio)

  }


//Creates the dashboard
  ngOnInit() {

      this.cryptoList=["BTC","ETH","XRP","BCH"]
      this.stockList=["PIH","PIHPP","TURN","FLWS","FCCY","SRCE","VNET","TWOU","JOBS","CAFD","EGHT","AVHI","SHLM","AAON","ABAX","ABEO","ABEOW","ABIL","ABMD","ABLX","AXAS","ACIU","ACIA","ACTG","ACHC","ACAD","ACST","AXDX","XLRN","ANCX","ARAY","ACRX","ACER","ACET","AKAO","ACHV","ACHN","ACIW","ACRS","ACMR","ACNB","ACOR","SQZZ","ATVI","ACXM","ADMS","ADMP","ADAP","ADUS","AEY","IOTS","ADMA","ADBE","ADOM","ADTN","ADRO","ADES","AEIS","AMD","ADXS","ADXSW","ADVM","ACT","AEGN","AGLE","AEHR","AMTX","AERI","AVAV","AEZS","AEMD","GNMX","AFMD","AGEN","AGRX","AGYS","AGIO","AGMH","AGNC","AGNCB","AGNCN","AGFS","AGFSW","ALRN","AIMT","AIRT","ATSG","AIRG","AMCN","AKAM","AKTX","AKCA","AKBA","AKER","AKRX","AKTS","ALRM","ALSK","ALBO","ABDC","ALDR","ALDX","ALXN","ALCO","ALGN","ALIM","ALJJ","ALKS","ABTX","ALGT","ALNA","AHGP","AMMA","ARLP","AHPI","AMOT","ALQA","ALLT","MDRX","ALNY","AOSL","GOOG","GOOGL","SMCP","ATEC","ALPN","SWIN","AMR","AMRWW","AABA","ALTR","ALT","ASPS","AIMC","ALZH","AMAG","AMRN","AMRK","AMZN","AMBC","AMBCW","AMBA","AMCX","DOX","AMDA","AMED","UHAL","AMRH","AMRHW","ATAX","AMOV","AAL","ACSF","AETI","AMNB","ANAT","AOBC","APEI","ARII","AMRB","AMSWA","AMSC","AMWD","CRMT","ABCB","AMSF","ASRV","ASRVP","ATLO","AMGN","FOLD","AMKR","AMPH","IBUY","ASYS","AFSI","AMRS","ADI","ALOG","ANAB","AVXL","ANCB","ANGI","ANGO","ANIP","ANIK","ANSS","ATRS","ANTH","APLS","APOG","APEN","AINV","AMEH","APPF","APPN","AAPL","ARCI","APDN","APDNW","AGTC","AMAT","AAOI","AREX","APTI","APRI","APVO","APTO","AQMS","AQB","AQXP","ARDM","ARLZ","PETX","ABUS","ARCW","ABIO","RKDA","ARCB","ACGL","ACGLO","ACGLP","APLP","FUV","ARCT","ARDX","ARNA","ARCC","ARGX","AGII","AGIIL","ARGS","ARKR","ARMO","ARTX","ARQL","ARRY","ARRS","DWCR","DWAT","AROW","ARWR","ASNS","ARTNA","ARTW","ASNA","ASND","ASCMA","APWC","ASML","ASPU","AZPN","ASMB","ASFI","ASTE","ATRO","ALOT","ASTC","ASUR","ASV","ATAI","ATRA","ATHN","ATNX","ATHX","ATAC","ATACR","ATACU","AAME","ACBI","ACFC","AY","ATLC","AAWW","AFH","AFHBL","TEAM","ATNI","ATOM","ATOS","ATRC","ATRI","ATTU","LIFE","AUBN","BOLD","AUDC","AUPH","EARS","ADSK","ADP","AUTO","AVDL","ATXI","AVEO","AVXS","AVNW","CDMO","CDMOP","AVID","AVGR","CAR","AHPA","AHPAU","AHPAW","AWRE","ACLS","AXGN","AAXN","AXON          ","AXSM","AXTI","AYTU","AZRX","BCOM","RILY","RILYG","RILYL","RILYZ","BOSC","BIDU","BCPC","BWINA","BWINB","BLDP","BANF","BANFP","BCTF","BAND","BOCH","BMRC","BMLP","BKSC","BOTJ","OZRK","BFIN","BWFG","BANR","BZUN","DFVL","DFVS","DLBL","DLBS","DTUL","DTUS","DTYL","DTYS","FLAT","STPP","TAPR","BHAC","BHACR","BHACU","BHACW","BBSI","BSET","BCBP","BECN","BBGI","BBBY","BGNE","BELFA","BELFB","BLPH","BLCM","BNCL","BNFT","BNTC","BNTCW","BYSI","BGCP","BGFV","BRPA","BRPAR","BRPAU","BRPAW","BILI","BASI","ORPN","BIOC","BCRX","BDSI","BFRA","BIIB","BHTG","BKYI","BIOL","BLFS","BLRX","BMRN","BMRA","BVXV","BVXVW","BPTH","BIOS","BSTC","BSPM","TECH","BEAT","BTAI","BCAC","BCACR","BCACU","BCACW","BJRI","BBOX","BRAC","BRACR","BRACU","BRACW","BLKB","HAWK","BL","BKCC","ADRA","ADRD","ADRE","ADRU","BLNK","BLNKW","BLMN","BCOR","BLBD","BUFF","BHBK","BLUE","BKEP","BKEPP","BPMC","ITEQ","BMCH","BOFI","BOFIL","WIFI","BOJA","BOKF","BOKFL","BNSO","BKNG","BRQS","BOMN","BPFH","BPFHP","BPFHW","EPAY","BOXL","BCLI","BVNSC","BBRG","BDGE","BLIN          ","BWB","BRID","BCOV","BHF","AVGO","BVSN","BYFC","BWEN","BPY","BRKL","BRKS","BRKR","BMTC","BLMT","BSQR","BLDR","BUR","BFST","CFFI","CHRW","CA","CCMP","CDNS","CDZI","CZR","CSTE","PRSS","CLBS","CHY","CHI","CCD","CHW","CGO","CSQ","CAMP","CVGW","CALA","CALM","CLMT","CRUSC","CLXT","ABCD","CATC","CAC","CAMT","CSIQ","CGIX","CPHC","CPLA","CCBG","CPLP","CSWC","CSWCL","CPTA","CPTAG","CPTAL","CFFN","CAPR","CSTR","CPST","CARA","CARB","CRME","CSII","CDLX","CATM","CDNA","CECO","CTRE","CARG","CARO","CART","CRZO","TAST","CARV","CASM","CASA","CWST","CASY","CASI","CASS","CATB","CBIO","CPRX","CATS","CATY","CATYW","CGVIC","CIVEC","CVCO","CAVM","CBFV","CBAK","CBOE","CBTX","CDK","CDTI","CDW","CECE","CELC","CELG","CELGZ","CLDX","APOP","APOPW","CLRB","CLRBW","CLRBZ","CLLS","CBMG","CLSN","CELH","CYAD","CETX","CETXP","CETXW","CDEV","CSFL","CETV","CFBK","CENT","CENTA","CVCY","CENX","CNBKA","CNTY","CRNT","CERC","CERCW","CERN","CERS","KOOL","CEVA","CSBR","CYOU","BURG","CTHR","GTLS","CHTR","CHFN","CHKP","CHEK","CHEKW","CKPT","CEMI","CHFC","CCXI","CHMG","CHKE","CHFS","CHMA","CSSE","PLCE","CMRX","CADC","CALI","CAAS","CBPO","CCCL","CCCR","CCRC","JRJC","HGSH","CNIT","CIFS","CJJD","CLDC","HTHT","CHNR","CREG","CNTF","CXDC","CCIH","CNET","IMOS","CDXC","CHSCL","CHSCM","CHSCN","CHSCO","CHSCP","CHDN","CHUY","CDTX","CMCT","CMCTP","CMPR","CINF","CIDM","CTAS","CRUS","CSCO","CTRN","CTXR","CTXRW","CZNC","CZWI","CZFC","CIZN","CTXS","CHCO","CIVB","CIVBP","CLAR","CLNE","CACG","YLDE","LRGE","CLFD","CLRO","CLSD","CLIR","CLIRW","CMTA","CBLI","CLVS","CMFN","CMSS","CMSSR","CMSSU","CMSSW","CME","CCNE","CWAY","COBZ","COKE","COCP","CODA","CDXS","CODX","CVLY","JVA","CCOI","CGNT","CGNX","CTSH","CWBR","COHR","CHRS","COHU","CLCT","COLL","CIGI","CLGN","CBAN","COLB","CLBK","COLM","CMCO","CMCSA","CBSH","CBSHP","CHUBA","CHUBK","CVGI","COMM","JCS","ESXB","CFBI","CYHHZ","CTBI","CWBC","CVLT","CGEN","CPSI","CTG","CHCI","CMTL","CNAT","CNCE","CXRX","CDOR","CFMS","CNFR","CNMD","CTWS","CNOB","CONN","CNSL","CWCO","CNAC","CNACR","CNACU","CNACW","CPSS","CFRX","CTRV","CTRL","CVON","CVONW","CPRT","CRBP","CORT","CORE","CORI","CSOD","CRVL","CRVS","CSGP","COST","CPAH","ICBK","COUP","CVTI","COWN","COWNZ","PMTS","CPSH","CRAI","CBRL","BREW","CRAY","CACC","DGLD","DSLV","GLDI","SLVO","TVIX","TVIZ","UGLD","USLV","USOI","VIIX","VIIZ","ZIV","CREE","CRESY","CRSP","CRTO","CROX","CRON","CCRN","CRWS","CYRX","CYRXW","CSGS","CCLP","CSPI","CSWI","CSX","CTIC","CTIB","CTRP","CUE","CUI","CPIX","CRIS","CUTR","CVBF","CVV","CYAN","CYBR","CYBE","CYCC","CYCCP","CBAY","CY","CYRN","CONE","CYTK","CTMX","CYTX","CYTXW","CTSO","CYTR","DJCO","DAKT","DARE","DRIO","DRIOW","DZSI","DSKE","DSKEW","DAIO","DWCH","PLAY","DTEA","DFNL","DINT","DUSA","DWLD","DWSN","DBVT","DCPH","DFRG","TACO","TACOW","DMPI","DELT","DNLI","DENN","XRAY","DEPO","DERM","DEST","DXLG","DSWL","DTRM","DXCM","DFBH","DFBHU","DFBHW","DHXM","DHIL","FANG","DCIX","DRNA","DFBG","DFFN","DGII","DMRC","DRAD","DGLY","APPS","DCOM","DIOD","DISCA","DISCB","DISCK","DISH","DVCR","SAUC","DLHC","BOOM","DNBF","DOGZ","DLTR","DLPN","DLPNW","DGICA","DGICB","DMLP","DORM","DOVA","LYL","DOTA","DOTAR","DOTAU","DOTAW","DBX","DCAR","DRYS","DSPG","DLTH","DNKN","DRRX","DXPE","DYSL","DYNT","DVAX","ETFC","EBMT","EGBN","EGLE","EFBI","EGRX","EWBC","EACQ","EACQU","EACQW","EML","EAST","EASTW","EVGBC","EVSTC","EVFTC","EVLMC","OKDCC","EBAY","EBAYL","EBIX","ELON","ECHO","SATS","EEI","ESES","EDAP","EDGE","EDGW","EDIT","EDUC","EGAN","EGLT","EHTH","EIGR","EKSO","LOCO","EMITF","ESLT","ERI","ESIO","EA","EFII","ELSE","ELEC","ELECU","ELECW","EBIO","ESBK","ELTK","EMCI","EMCF","EMKR","EMMS","NYNY","ENTA","ECPG","WIRE","ENDP","ECYT","ELGX","NDRA","NDRAW","EIGI","WATT","EFOI","ERII","EGC","ENG","ENPH","ESGR","ENFC","ENTG","EBTC","EFSC","EPZM","PLUS","EQIX","EQFN","EQBK","ERIC","ERIE","ERYP","ESCA","ESPR","ESQ","ESSA","EPIX","ESND","ESTR","ESTRW","VBND","VUSE","VIDI","ETSY","CLWT","EEFT","ESEA","EVEP","EVBG","EVK","MRAM","EVLV","EVFM","EVGN","EVOK","EOLS","EVOL","EXAS","FLAG","XELA","EXEL","EXFO","EXLS","EXPE","EXPD","EXPO","ESRX","XOG","EXTR","EYEG","EYEGW","EYEN","EYPT","EZPW","FFIV","FB","DAVE","FANH","FARM","FMAO","FFKT","FMNB","FAMI","FARO","FAST","FAT","FATE","FBSS","FCRE","FSAC","FSACU","FSACW","FNHC","FENC","GSM","FFBW","FCSC","FGEN","FDBC","ONEQ","LION","FDUS","FDUSL","FRGI","FITB","FITBI","FNGN","FISI","FNSR","FNJN","FNTE","FNTEU","FNTEW","FEYE","FBNC","FNLC","FRBA","BUSE","FBIZ","FCAP","FCFS","FCNCA","FCBC","FCCO","FBNK","FDEF","FFBC","FFBCW","FFIN","THFF","FFNW","FFWM","FGBI","FHB","INBK","INBKL","FIBK","FRME","FMBH","FMBI","FNWB","FSFG","FSLR","FAAR","FPA","BICK","FBZ","FTHI","FCAL","FCAN","FTCS","FCEF","FCA","SKYY","RNDM","FDT","FDTS","FVC","FV","IFV","DWPP","FEM","RNEM","FEMB","FEMS","FTSM","FEP","FEUZ","FGM","FTGC","FTLB","HYLS","FHK","NFTY","FTAG","FTRI","LEGR","FPXI","YDIV","FJP","FEX","FTC","RNLC","FTA","FLN","LMBS","FMB","FMK","FNX","FNY","RNMC","FNK","FAD","FAB","MDIV","MCEF","FMHI","QABA","ROBT","FTXO","QCLN","GRID","CIBR","FTXG","CARZ","FTXN","FTXH","FTXD","FTXL","FONE","TDIV","FTXR","QQEW","QQXT","QTEC","AIRR","QINC","RDVY","RFAP","RFDI","RFEM","RFEU","FTSL","FYX","FYC","RNSC","FYT","SDVY","FKO","FCVT","FDIV","FSZ","FIXD","TUSA","FKU","RNDV","FUNC","FUSB","SVVC","FSV","FISV","FIVE","FPRX","FVE","FIVN","FLEX","FLKS","FLXN","SKOR","LKOR","MBSD","ASET","ESGG","ESG","QLC","FPAY","FLXS","FLIR","FLNT","FLDM","FFIC","FNBG","FNCB","FOMX","FONR","FSCT","FRSX","FORM","FORTY","FORR","FRTA","FTNT","FBIO","FBIOP","FWRD","FORD","FWP","FOSL","FMI","FOXF","FRAN","FELE","FRED","RAIL","FEIM","FRPT","FTEO","FTR","FTRPR","FRPH","FSBW","FSBC","FTD","FTEK","FCEL","FLGT","FORK","FLL","FULT","FNKO","FSNN","FTFT","FFHL","WILC","GTHX","FOANC","GRBIC","MOGLC","GAIA","GLPG","GALT","GLMD","GLPI","GPIC","GRMN","GARS","GLIBA","GLIBP","GDS","GEMP","GENC","GFN","GFNCP","GFNSL","GENE","GNUS","GNMK","GNCA","GHDX","GNPX","GNTX","THRM","GEOS","GABC","GERN","GEVO","ROCK","GIGM","GIII","GILT","GILD","GBCI","GLAD","GLADN","GOOD","GOODM","GOODO","GOODP","GAIN","GAINM","GAINN","GAINO","LAND","LANDP","GLBZ","GBT","ENT","GBLI","GBLIL","GBLIZ","SELF","GWRS","DRIV","KRMA","FINX","BFIT","SNSR","LNGR","MILN","EFAS","QQQC","BOTZ","CATH","SOCL","ALTY","SRET","YLCO","GLBS","GLUU","GLYC","GOGO","GLNG","GMLP","GMLPP","DNJR","GDEN","GOGL","GBDC","GTIM","GPRO","GPAQ","GPAQU","GPAQW","GSHT","GSHTU","GSHTW","GOV","GOVNI","LOPE","GRVY","GECC","GECCL","GECCM","GEC","GLDD","GSBC","GNBC","GRBK","GPP","GPRE","GCBC","GLRE","GSUM","GRIF","GRFS","GRPN","OMAB","GGAL","GSIT","GSVC","GTXI","GTYH","GTYHU","GTYHW","GBNK","GNTY","GFED","GIFI","GURE","GPOR","GWPH","GWGH","GYRO","HEES","HLG","HNRG","HALL","HALO","HBK","HLNE","HBHC","HBHCL","HAFC","HQCL","HONE","HDNG","HLIT","HFGIC","HBIO","HCAP","HCAPZ","HAS","HA","HCOM","HWKN","HWBK","HYAC","HYACU","HYACW","HAYN","HDS","HIIQ","HCSG","HQY","HSTM","HTLD","HTLF","HTBX","HEBT","HSII","HELE","HMNY","HSDT","HMTV","HNNA","HSIC","HTBK","HFWA","HCCI","MLHR","HRTX","HSKA","HX","HIBB","SNLN","HPJ","HIHO","HIMX","HIFS","HSGX","HMNF","HMSY","HOLI","HOLX","HBCP","HOMB","HFBL","HMST","HMTA","HTBI","FIXX","HOFT","HOPE","HFBC","HBNC","HZNP","HRZN","DAX","QYLD","HDP","HPT","TWNK","TWNKW","HMHC","HWCC","HOVNP","HBMD","HTGM","HUBG","HSON","HDSN","HUNT","HUNTU","HUNTW","HBAN","HBANN","HBANO","HURC","HURN","HCM","HBP","HVBC","HYGS","IDSY","IAC","IAM","IAMXR","IAMXW","IBKC","IBKCO","IBKCP","ICAD","IEP","ICCH","ICFI","ICHR","ICLK","ICLR","ICON","ICUI","IPWR","INVE","IDRA","IDXX","IESC","IROQ","IFMK","INFO","IIVI","KANG","IKNX","ILG","ILMN","ISNS","IMMR","ICCC","IMDZ","IMNP          ","IMGN","IMMU","IMRN","IMRNW","IMMP","IPXL","IMPV","PI","IMMY","INCY","INDB","IBCP","IBTX","INDU","INDUU","INDUW","ILPT","IDSA","INFN","INFI","IPCC","IFRX","III","IFON","IEA","IEAWW","IMKTA","INWK","INOD","IPHS","IOSP","INNT","ISSC","INVA","INGN","INOV","INO","INPX","INSG","NSIT","ISIG","INSM","INSE","IIIN","PODD","INSY","NTEC","IART","IDTI","IMTE","INTC","NTLA","IPCI","IPAR","IBKR","ICPT","IDCC","TILE","LINK","IMI","INAP","IBOC","ISCA","IGLD","IIJI","IDXG","XENT","INTX","IVAC","INTL","ITCI","IIN","INTU","ISRG","ISTR","ISBC","ITIC","NVIV","IVTY","IONS","IOVA","IPAS","IPGP","IPIC","CLRG","CSML","IQ","IRMD","IRTC","IRIX","IRDM","IRDMB","IRBT","IRWD","IRCP","PMPT","SLQD","CSJ","ISHG","SHY","TLT","IEI","IEF","AIA","COMT","ISTB","IXUS","IUSG","IUSV","IUSB","HEWG","SUSB","SUSC","XT","FALN","IFEU","IFGL","IGF","GNMA","HYXE","CIU","IGOV","EMB","MBB","JKI","ACWX","ACWI","AAXJ","EWZS","MCHI","ESGD","SCZ","ESGE","EEMA","EMXC","EUFN","IEUS","RING","MPCT","ENZL","QAT","TUR","UAE","ESGU","IBB","SOXX","AMCA","EMIF","ICLN","WOOD","INDY","IJT","DVY","SHV","CRED","PFF","ISRL","ITI","ITRI","ITRN","ITUS","IVENC","IVFGC","IVFVC","IZEA","JJSF","MAYS","JBHT","JCOM","JASO","JKHY","JACK","JXSB","JAGX","JAKK","JMBA","JRVR","SGQI","JSML","JSMD","JASN","JASNW","JAZZ","JD","JSYN","JSYNR","JSYNU","JSYNW","JBLU","JTPY","JCTCF","JMU","JBSS","JOUT","JNCE","JNP","KTWO","KALU","KALA","KALV","KMDA","KNDI","KPTI","KAAC","KAACU","KAACW","KZIA","KBLM","KBLMR","KBLMU","KBLMW","KBSF","KCAP","KCAPL","KRNY","KELYA","KELYB","KMPH","KFFB","KERX","KEQU","KTCC","KFRC","KE","KBAL","KIN","KGJI","KINS","KONE","KNSL","KIRK","KTOV","KTOVW","KLAC","KLXI","KONA","KOPN","KRNT","KOSS","KWEB","KTOS","KRYS","KLIC","KURA","KVHI","FSTR","LJPC","LSBK","LBAI","LKFN","LAKE","LRCX","LAMR","LANC","LCA","LCAHU","LCAHW","LNDC","LARK","LMRK","LMRKN","LMRKO","LMRKP","LE","LSTR","LNTH","LTRX","LSCC","LAUR","LAWS","LAYN","LAZY","LCNB","LBIX","LPTX","LGCY","LGCYO","LGCYP","LTXB","DDBI","EDBI","INFR","LVHD","SQLV","UDBI","LACQ","LACQU","LACQW","LMAT","TREE","LEVL","LXRX","LX","LGIH","LHCG","LLIT","LBRDA","LBRDK","LEXEA","LEXEB","LBTYA","LBTYB","LBTYK","LILA","LILAK","BATRA","BATRK","FWONA","FWONK","LSXMA","LSXMB","LSXMK","TAX","LTRPA","LTRPB","LPNT","LCUT","LFVN","LWAY","LGND","LTBR","LPTH","LLEX","LMB","LLNW","LMNR","LINC","LECO","LIND","LINDW","LINU","LPCN","LQDT","LFUS","LIVN","LOB","LIVE","LPSN","LIVX","LKQ","LMFA","LMFAW","LOGI","LOGM","CNCR","LONE","LFIN","LOOP","LORL","LOXO","LPLA","LRAD","LYTS","LULU","LITE","LMNX","LUNA","LBC","MBTF","MACQ","MACQU","MACQW","MBVX","MCBC","MFNC","MTSI","MGNX","MDGL","MAGS","MGLN","MGIC","CALL","MNGA","MGYR","MHLD","MMYT","MBUU","MLVF","MAMS","TUSK","RPIBC","MANH","LOAN","MNTX","MTEX","MNKD","MANT","MARA","MCHX","MARPS","MRNS","MKTX","MRLN","MAR","MBII","MRTN","MMLP","MRVL","MASI","MTCH","MTLS","MPAC","MPACU","MPACW","MTRX","MAT","MATR","MATW","MXIM","MXWL","MZOR","MBFI","MBFIO","MCFT","MGRC","MDCA","MFIN","MFINL","MTBC","MTBCP","MNOV","MDSO","MDGS","MDWD","MEDP","MEIP","MLCO","MLNT","MLNX","MELR","MNLO","MTSL","MELI","MBWM","MERC","MBIN","MRCY","MREO","EBSB","MRBK","VIVO","MRDN","MRDNW","MMSI","MACK","MRSN","MRUS","MLAB","MESO","CASH","MEOH","MGEE","MGPI","MBOT","MCHP","MU","MICT","MICTW","MSCC","MSFT","MSTR","MVIS","MPB","MTP","MCEP","MBCN","MSEX","MSBI","MOFG","MIME","MDXG","MNDO","MB","NERV","MGEN","MRTX","MSON","MIND","MINDP","MITK","MITL","MKSI","MMAC","MINI","MOBL","MMDM","MMDMR","MMDMU","MMDMW","MOGO","MTEM","MBRX","MNTA","MOMO","MKGI","MCRI","MDLZ","MGI","MDB","MPWR","TYPE","MNRO","MRCC","MNST","MORN","MOR","MOSY","MTFB","MTFBW","MPAA","MOTS","MPVD","MOXC","MSBF","MTEC","MTECU","MTECW","MTGE","MTGEP","MTSC","MUDS","MUDSU","MUDSW","LABL","MBIO","MFSF","MVBF","MYSZ","MYL","MYND","MYNDW","MYOK","MYOS","MYRG","MYGN","NBRV","NAKD","NNDM","NANO","NSTG","NAOV","NH","NK","NSSC","NDAQ","NTRA","NATH","NAUH","NKSH","FIZZ","NCMI","NCOM","NESR","NESRW","NGHC","NGHCN","NGHCO","NGHCP","NGHCZ","NHLD","NHLDW","NATI","NRC","NSEC","EYE","NWLI","NAII","NHTC","NATR","BABY","JSM","NAVI","NBTB","NCSM","NEBU","NEBUU","NEBUW","NKTR","NMRD","NEOG","NEO","NEON","NEOS","NVCN","NEPT","UEPS","NETE","NTAP","NTES","NFLX","NTGR","NLST","NTCT","NTWK","CUR","NBIX","NURO","NUROW","NTRP","NBEV","NYMT","NYMTN","NYMTO","NYMTP","NEWA","NLNK","NMRK","NWS","NWSA","NEWT","NEWTI","NEWTZ","NXEO","NXEOU","NXEOW","NXST","NEXT","NFEC","NODK","EGOV","NICE","NICK","NCBS","NITE","NIHD","NMIH","NNBR","NDLS","NDSN","NSYS","NBN","NTIC","NTRS","NTRSP","NFBK","NRIM","NWBI","NWPX","NCLH","NWFL","NVFY","NVMI","NOVN","NOVT","NVAX","NVLN","NVCR","NVMM","NVUS","NUAN","NCNA","NTNX","NTRI","NUVA","NVTR","QQQX","NVEE","NVEC","NVDA","NXPI","NXTM","NXTD","NXTDW","NYMX","OIIM","OVLY","OCSL","OCSLL","OCSI","OASM","OBLN","OBSV","OBCI","OPTT","ORIG","OCFC","OCLR","OFED","OCUL","ODT","OMEX","ODP","OFS","OFSSL","OHAI","OVBC","OHRP","OKTA","ODFL","OLBK","ONB","OPOF","OSBC","OSBCP","OLLI","ZEUS","OFLX","OMER","OMNT","OMCL","ON","OTIV","ONS","ONSIW","ONSIZ","OMED","ONTX","ONTXW","ONCS","OHGI","OSS","OPBK","OTEX","OPES","OPESU","OPESW","OPGN","OPGNW","OPHT","OPNT","OPK","OBAS","OCC","OPHC","OPTN","OPB","ORMP","OSUR","ORBC","ORBK","ORLY","ONVO","ORGS","SEED","OESX","ORIT","ORRF","OFIX","KIDS","OSIS","OSPR","OSPRU","OSPRW","OSN","OTEL","OTIC","OTTW","OTTR","OVAS","OSTK","OVID","OXBR","OXBRW","OXFD","OXLC","OXLCM","OXLCO","OXSQ","OXSQL","PFIN","PTSI","PCAR","VETS","PACB","PEIX","PMBC","PPBI","PCRX","PACW","PTIE","PAAS","PANL","PZZA","FRSH","PRTK","PCYG","PKBK","PRKR","PKOH","PTNR","PBHC","PATK","PNBK","PATI","PEGI","PDCO","PTEN","PAVM","PAVMW","PAVMZ","PAYX","PCTY","PYDS","PYPL","PBBI","CNXN","PCMI","PCSB","PCTI","PDCE","PDFS","PDLI","PDLB","PDVW","SKIS","PGC","PEGA","PENN","PVAC","PFLT","PNNT","PWOD","WRLS","WRLSR","WRLSU","WRLSW","PEBO","PEBK","PFIS","PBCT","PBCTP","PUB","PEP","PRCP","PRFT","PFMT","PERI","PESI","PPIH","PTX","PERY","PGLC","PETQ","PETS","PFSW","PGTI","PHII","PHIIK","PAHC","PLAB","PICO","PIRS","PPC","PME","PNK","PNFP","PPSI","PXLW","EAGL","EAGLU","EAGLW","PLYA","PLXS","PLUG","PLBC","PSTI","PLXP","PBSK","PNTR","PCOM","POLA","COOL","POLY","POOL","POPE","BPOP","BPOPM","BPOPN","PBIB","PTLA","PBPB","PCH","POWL","POWI","PLW","PKW","PFM","PYZ","PEZ","PSL","PIZ","PIE","PXI","PFI","PTH","PRN","DWLV","PDP","DWAQ","DWAS","DWIN","DWTR","PTF","PUI","IDLB","PRFZ","PAGG","PSAU","PIO","PGJ","PEY","IPKW","PID","KBWB","KBWD","KBWY","KBWP","KBWR","LDRI","LALT","PNQI","PDBC","QQQ","USLB","PSCD","PSCC","PSCE","PSCF","PSCH","PSCI","PSCT","PSCM","PSCU","VRIG","PHO","PRAA","PRAH","PRAN","PRPO","AIPT","PFBC","PLPC","PFBI","PINC","LENS","PSDO","PRGX","PSMT","PNRG","PRMW","PRIM","PVAL","PFG","BTEC","PXUS","GENY","PSET","PY","PMOM","USMC","PSC","PDEX","IPDN","PFIE","PGNX","PRGS","LUNG","PFPT","PRPH","PRQR","EQRR","BIB","UBIO","TQQQ","ZBIO","SQQQ","BIS","PSEC","PTGX","PRTO","PTI","PRTA","PVBC","PROV","PBIP","PMD","PTC","PTCT","PULM","PLSE","PBYI","PACQU","PCYO","PRPL","PRPLW","PXS","QADA","QADB","QCRH","QGEN","QIWI","QRVO","QCOM","QSII","QBAK","QLYS","QTNA","QTRX","QTRH","QRHC","QUIK","QDEL","QNST","QUMU","QTNT","QRTEA","QRTEB","RRD","RCM","RARX","RADA","RDCM","RSYS","RDUS","RDNT","RDWR","METC","RMBS","RAND","GOLD","RNDB","RPD","RAVE","RAVN","RBB","ROLL","RICK","RCMT","RDI","RDIB","RGSE","BLCN","RNWK","RP","RETA","RCON","REPH","RRGB","RRR","RDVT","RDFN","RDHL","REGN","RGNX","RGLS","REIS","RBNC","RELV","MARK","RNST","REGI","ABAC","RCII","RGEN","RBCAA","FRBK","REFR","RSLS","RESN","RECN","HAIR","TORC","ROIC","RETO","RTRX","RVNC","RVEN","RVLT","RWLK","RFIL","RGCO","RYTM","RBBN","RIBT","RIBTW","RELL","RIGL","RNET","RMNI","RIOT","REDU","RTTR","RVSB","RLJE","RMGN","ROBO","RCKT","RMTI","RCKY","RMCF","ROKU","ROSE","ROSEU","ROSEW","ROSG","ROST","RGLD","RPXC","RTIX","RBCN","RMBL","RUSHA","RUSHB","RUTH","RXII","RXIIW","RYAAY","STBA","SANW","SCAC","SCACU","SCACW","SBRA","SBRAP","SABR","SAEX","SAFT","SAGE","SAIA","SALM","SAL","SAFM","SASR","SGMO","SANM","GCVRZ","SPNS","SRPT","SVRA","SBFG","SBFGP","SBAC","SCSC","SMIT","SCHN","SCHL","SGMS","SCPH","SCYX","SEAC","SBCF","STX","SHIP","SHIPW","SHLD","SHLDW","SHOS","SPNE","SGEN","EYES","EYESW","SECO","SCWX","SNFCA","SEIC","SLCT","SIR","SELB","SIGI","SLS","LEDS","SMTC","SENEA","SENEB","SNES","SNH","SNHNI","SNHNL","AIHS","SNMX","SRTS","SRTSW","STNL","STNLU","STNLW","SQBG","MCRB","SREV","SFBS","SSC","SVBI","SGBX","SGOC","SEII","SMED","SHSP","SHEN","PIXY","SHLO","TYHT","SHPG","SCVL","SHBI","SSTI","SFLY","SIFI","SIEB","SNNA","SIEN","BSRR","SRRA","SWIR","SIFY","SIGA","SIGM","SGLB","SGLBW","SGMA","SBNY","SBNYW","SLGN","SILC","SLAB","SIMO","SAMG","SSNT","SFNC","SLP","SINA","SBGI","SINO","SVA","SIRI","SITO","SKYS","SKYW","SWKS","SNBR","SLM","SLMBP","SGH","SND","SMBK","SMSI","SMTX","SRAX","SCKT","SODA","SOHU","SLRC","SUNS","SEDG","SLNO","SLNOW","SLGL","SLDB","SNGX","SNGXW","SONC","SOFO","SNOA","SNOAW","SPHS","SORL","SRNE","SOHO","SOHOB","SOHOO","SOHOK","SFBC","SSB","SFST","SMBC","SONA","SBSI","SP","SGRP","SPKE","SPKEP","ONCE","SPAR","SPTN","DWFI","SPPI","SPRO","ANY","SPEX","SPI","SAVE","SPLK","SPOK","SPWH","SBPH","FUND","SFM","SPSC","SSNC","SSLJ","SSRM","STAA","STAF","STMP","SBLK","SBLKZ","SBUX","STFC","STBZ","STDY","GASS","STCN","STLD","SMRT","STLR","STLRU","STLRW","SBOT","STML","SRCL","SRCLP","SBT","STRL","SHOO","SSFN","SFIX","SYBT","BANX","SSKN","SSYS","HNDL","STRT","STRS","STRA","STRM","SBBP","STB","SUMR","SMMF","SSBI","SMMT","SNHY","SNDE","SNSS","STKL","SPWR","RUN","SUNW","SMCI","SPCB","SCON","SGC","SUPN","SPRT","SURF","SGRY","SRDX","SBBX","SIVB","SYKE","SYMC","SYNC","SYNL","SYNA","SNCR","SNDX","SYNH","SGYP","SYBX","SNPS","SYNT","SES","SYPR","SYRS","TROW","TTOO","TRHC","TCMD","TAIT","TTWO","TLND","TNDM","TLF","TANH","TPIV","TEDU","TATT","TAYD","CGBD","TCPC","AMTD","PETZ","TECD","TCCO","TTGT","TGLS","TGEN","TNAV","TLGT","TELL","TENX","TERP","TRTLU","TBNK","TSRO","TSLA","TESS","TTEK","TTPH","TCBI","TCBIL","TCBIP","TCBIW","TXN","TXRH","TFSL","TGTX","ANDE","TBBK","BPRN","CG","TCGP","CAKE","CHEF","TCFC","DSGX","DXYN","ENSG","XONE","FINL","FBMS","FLIC","GT","HABT","HCKT","HAIN","CUBA","INTG","JYNT","KEYW","KHC","OLD","MSG","MDCO","MEET","MIK","MIDD","NAVG","SLIM","STKS","ORG","PRSC","RMR","SMPL","SMPLW","TSG","TTD","ULTI","YORW","NCTY","TXMD","TRPX","TBPH","TST","TCRD","TIBR","TIBRU","TIBRW","TIG","TTS","TIL","TSBK","TNTR","TIPT","TITN","TTNP","TVTY","TIVO","TMUS","TMSR","TMSRW","TOCA","TNXP","TISA","TOPS","TRCH","TRMD","TSEM","CLUB","TOWN","TPIC","TCON","TSCO","TWMC","TACT","TRNS","TGA","TA","TANNI","TANNL","TANNZ","TZOO","TRMT","TRVN","TCBK","TRIL","TRS","TRMB","TRIB","TRIP","TSC","TSCAP","TBK","TRVG","TRNC","TROV","TRUE","THST","TRUP","TRST","TRMK","TSRI","TTEC","TTMI","TCX","TUES","TOUR","HEAR","FOX","FOXA","TWIN","TRCB","TYME","USCR","PRTS","USEG","GROW","USAU","UBNT","UFPT","ULTA","UCTT","UPL","RARE","ULBI","UMBF","UMPQ","UNAM","UBSH","UNB","QURE","UBCP","UBOH","UBSI","UCBA","UCBI","UCFC","UBNK","UFCS","UIHC","UNFI","UBFO","USLM","UTHR","UG","UNIT","UNTY","OLED","UEIC","UFPI","ULH","USAP","UVSP","UMRX","UPLD","UONE","UONEK","URBN","URGN","ECOL","USAT","USATP","USAK","UTMD","UTSI","VLRX","VALX","VALU","VNDA","BBH","GNRX","PPH","VWOB","VNQI","VCIT","VGIT","VIGI","VYMI","VCLT","VGLT","VMBS","VONE","VONG","VONV","VTWO","VTWG","VTWV","VTHR","VCSH","VTIP","VGSH","VTC","BNDX","VXUS","VEAC","VEACU","VEACW","VREX","VRNS","VDSI","VBLT","VXRT","VBIV","VECO","VEON","VRA","VCYT","VSTM","VCEL","VRNT","VRSN","VRSK","VBTX","VERI","VRML","VRNA","VSAR","VTNR","VRTX","VERU","VIA","VIAB","VSAT","VIAV","VICL","VICR","VCTR","CIZ","VSDA","CEY","CEZ","CID","CIL","CFO","CFA","CSF","CDC","CDL","VSMV","CSB","CSA","VRAY","VKTX","VKTXW","VBFC","VLGEA","VNOM","VIRC","VTSI","VIRT","VRTS","VRTSP","BBC","BBP","VRTU","VTGN","VC","VTL","VIVE","VVPR","VVUS","VOD","VOXX","VYGR","VSEC","VTVT","VUZI","WBA","WAFD","WAFDW","WASH","WSBF","WVE","WSTG","WCFB","WDFC","WEB","WB","WEBK","WEN","WERN","WSBC","WTBA","WABC","WSTL","WDC","WNEB","WLB","WPRT","WWR","WEYS","WHLR","WHLRD","WHLRP","WHLRW","WHF","WHFBL","WHLM","WVVI","WVVIP","WLDN","WLFC","WLTW","WSC","WSCWW","WIN","WING","WINA","WINS","WTFC","WTFCM","WTFCW","AGZD","AGND","CXSE","EMCG","EMCB","DGRE","DXGE","HYZD","WETF","DXJS","GULF","HYND","DGRW","DGRS","WIX","WMIH","WWD","WDAY","WKHS","WRLD","WMGI","WMGIZ","WSFS","WSCI","WVFC","WYNN","XBIT","XELB","XEL","XCRA","XNCR","XBIO","XENE","XGTI","XGTIW","XLNX","XOMA","XPER","XPLR","XSPA","XTLB","XNET","YNDX","YRIV","YTRA","YTEN","YIN","YOGA","YGYI","YRCW","YECO","YY","ZFGN","ZAGG","ZLAB","ZAIS","ZEAL","ZBRA","Z","ZG","ZN","ZNWAA","ZION","ZIONW","ZIONZ","ZIOP","ZIXI","ZKIN","ZGNX","ZSAN","ZS","ZUMZ","ZYNE","ZNGA"]


      this._stockService.defaultStockPrices()
        .subscribe(data => {


          console.log("Data:", data);
          length=data.length;

          for (let i = 0; i < data.length; i++) {


            this.staticData = JSON.stringify(data[i]);

            this.symbol = JSON.parse(this.staticData).Symbol;
            this.dates = JSON.parse(this.staticData).Dates;
            this.closedprice = JSON.parse(this.staticData).Prices;
            console.log("Length of dates is ", this.dates.length);
            console.log("Length of prices is ", this.closedprice.length);
            console.log("Dates is ", this.dates);
            console.log(i);
            let chartId = i + "canvas"
            console.log(chartId);


            let ctx = document.getElementById(chartId);
            console.log(ctx);

            this.chart = new Chart(ctx, {

                type: 'line',
                data: {

                  labels: this.dates,

                  datasets: [
                    {
                      data: this.closedprice,
                      borderColor: '#F8FCFB',
                      fill: false,
                      label: 'Price'
                    },


                  ],
                  options: {
                    legend: {
                      display: false
                    },
                    scales: {
                      xAxes: [{
                        display: true
                      }],
                      yAxes: [{
                        display: true
                      }]
                    }
                  }
                }
              }
            )

            this.chartArray.push(this.chart);
            this.symbolArray.push(this.symbol);

          }
        })

        this.getUser();


    }

    //Get the current user from the user service to the component
  getUser() {
    this._userservice.currentUser.subscribe(user => {
      this.user = user.data

      this.portfolio = this.user.portfolio;
      this.ngtabledata = this.portfolio;
      let stockPrice= 0;
      let portfolio_cp=0;
      let portfolio_sp=0;

      for(let i=0;i<this.portfolio.length;i++)
      {

      this._stockService.currentStockPrices(this.portfolio[i]["stockname"])
          .subscribe(data => {
            stockPrice=data;

            portfolio_cp+=  this.portfolio[i]["stockprice"] * this.portfolio[i]["quantity"];
            portfolio_sp+=  stockPrice *  this.portfolio[i]["quantity"];

            this.priceChange= portfolio_sp - portfolio_cp;
            console.log("I am checking the prices ", this.priceChange)

            console.log("Portfolio_cp is ", portfolio_cp)
            console.log("Portfolio_sp is ", portfolio_sp)
            console.log("Price change is ",this.priceChange)

          })
          }

    }, err => {
      console.log(err);
    });
  }




//Sets the stock type in the stock service
setstockType(type)
{
  this._stockService.setStockType(type)

}

//Searches for stocks and navigates to the cryptodetail page
stockSearch(search)
{
        this._stockService.setSearchString(search)
        this.router.navigate(['/','stockdetail'])

}

//Searches for crypto and navigates to the cryptodetail page
  cryptoSearch(search)
  {


    this._stockService.setSearchString(search)
    this.router.navigate(['/','cryptodetail'])

  }



//Update Chart function which is not used in this component but can be reused for updating the charts with dynamic values

updateChart(chart,dates,closedprice){


    console.log("Chart is ",chart.data);


    chart.data.labels.push(dates[dates.length-1]);
    chart.data.datasets[0].data.push(closedprice[closedprice.length-1]);
    chart.update();
    console.log("Chart Update called");

}


//Search a stock to view its details
searchStock()
{

  console.log("In the search stock and the search element is ",this.search)
  let stockSet = new Set(this.stockList)
  let cryptoSet = new Set(this.cryptoList)

  if (stockSet.has(this.search.toUpperCase()))
  {
    this.errorMsg = "";
    console.log("Element can be searched");
    this.setstockType("stock")
    this.stockSearch(this.search)


   }

   else if (cryptoSet.has(this.search.toUpperCase()))
  {
    this.errorMsg = "";
    console.log("Element can be searched");
    this.setstockType("crypto")
    this.cryptoSearch(this.search)


  }
   else
    {
      this.errorMsg = "Invalid Stock Name. Please enter a valid stock name.";
      console.log("Invalid Stock Name. Please enter a valid stock name.")

    }

}


  ngOnDestroy(){
    this.alive = false; // switches your TimerObservable off
  }

  public setSelectedEntities($event: any) {
    this.selectedEntities = $event;
    console.log("the selected entity is : ", this.selectedEntities[0]["stockname"]);
  }

  deleteStocks(items){
    // this._userservice.userstockdelete(this.selectedEntities[0]["stockname"]);
    // this._userservice.userstockdelete(this.selectedEntities[0]["stockname"])
    this._userservice.userstockdelete(items);
    this.getUser();
  }
}


