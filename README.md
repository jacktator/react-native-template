##React Native Template Doc
####开始
> 入口分别是index.android.js和index.ios.js
> ****

####运用的第三方库
> 框架的组建用的是native-base
> 
> 页面的导航用的是react-native-router-flux
> 
> 工具箱: lodash && moment
>
> spinner 用的是react-native-loading-spinner-overlay 
> 
> localstorage 用的是react-native-storage
> 
> 发 restful api 用的是axios
> ****

####Hints
> You will spend most of time on js folder
> 
> If you do not use redux, do not touch actions and reducers in js folder. However, do not remove them because react-native-router-flux requires them.
> ****

####添加新页面
1. 找到js/Routers/MainStackRouter.js
2. import the file of new page
3. add to scene

eg.<br>
`import Home from '../components/home/';`
`<Scene key="home" component={Home} hideNavBar initial />`<br/>
>initial will define the default entry page<br/>
>hideNavBar will hide the original default navbar 

####给app改名
强烈建议不要改package name还有文件名。
######ios
在info.plist中改
######android
在android/app/src/main/res/values/strings.xml中改

####给app改图标
参考[link](https://stackoverflow.com/questions/34329715/how-to-add-icons-to-react-native-app)