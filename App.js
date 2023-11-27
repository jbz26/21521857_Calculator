import {TextInput, Text, SafeAreaView, StyleSheet} from 'react-native';
import { Dimensions, TouchableOpacity,View  } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState,useEffect} from "react"

// or any files within the Snack
export default function App() {
  const [texts,change] = useState(0);
  const [buttonHeight,setBtnHeight] = useState(Dimensions.get('window').height/8);
  const [x1,changeval1] = useState(NaN);
  const [x2,changeval2] = useState(NaN);
  const [text, onChangeText] = useState('');
  const [mode,change_mode] = useState(0);
  const [state,change_state] = useState(0);
  const [a,change_a] = useState(0);
  const [b,change_b] = useState(0);
  const [c,change_c] = useState(0);
  const [check_history,change_historymode] = useState(false);
  const [history,get_txthistory] = useState("");
  const changeMode = () =>{
      change_mode((mode+1) % 2);
      change_state(0);
      change_a(0);
      change_b(0);
      change_c(0);
      onChangeText("");
      changeval1(NaN);
      changeval2(NaN);
  }
  const saveData = async (key,value) => {
  try {
    await AsyncStorage.setItem("ID", JSON.stringify(value));

  } catch (error) {
    alert('Lỗi lưu trữ dữ liệu:'+ value);
  }
};
// Lấy dữ liệu
//AsyncStorage.clear();
const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem("ID");
    const vAlue = JSON.parse(value);
    if (vAlue !== null) {
      return vAlue;
    }
  } catch (error) {
    return false;
  }
};
  function get_history(){
    get_txthistory("");
    getData(JSON.stringify("ID"))
      .then(value => {
        get_txthistory(value);
      })
  }
  function setmode(){
      if(check_history ==true){
        return(
          <View style = {styles.output} >
          <Text style = {styles.outputText}> {history}
          </Text>
          </View>
        )
      }
      else if(mode==0){
         return (<View style = {styles.output} >
          <Text style = {styles.outputText}> {(text)} </Text> 
           <TextInput
        style={styles.outputBorder}
        onChangeText={change}
        value={texts.toString()}
        placeholder="0"
        multiline
        numberOfLines={1}
      />
          </View>)
      }
      else {
        if(state!=1){   
         return (
          <View style = {styles.output} >
          <Text style = {styles.outputText}> Solve quadratic equation:  </Text> 
          <Text style = {styles.outputText}> ax^2 +bx + c = 0  </Text> 
         <Text style = {styles.outputText}>a:   </Text> 
         <TextInput style={styles.outputBorder}
         multiline
         numberOfLines = {1}
         value ={(a).toString()}
         onChangeText={change_a}
        />
         <Text style = {styles.outputText} >b:  {} </Text>
         <TextInput style={styles.outputBorder}
         multiline
           value ={(b).toString()}
         onChangeText={change_b}
         numberOfLines = {1}
        />
         <Text style = {styles.outputText} >c:  {} </Text> 
         <TextInput style={styles.outputBorder}
         multiline
           value ={c.toString()}
         onChangeText={change_c}
         numberOfLines = {1}
        />
         </View>)
        }
        else if(!isNaN(x1)&&!isNaN(x2)){
           return (
        <View  style = {styles.outputText}>
            <Text style = {styles.outputText} >x1:  {} </Text> 
         <TextInput style={styles.outputBorder}
         multiline
           value ={parseFloat(x1).toString()}
         numberOfLines = {1}
        />
          <Text style = {styles.outputText} >x2:  {} </Text> 
         <TextInput style={styles.outputBorder}
         multiline
           value ={parseFloat(x2).toString()}
         numberOfLines = {1}
        />
         </View>
         )
        }
        else if(!isNaN(x1)){
          {
           return (
        <View  style = {styles.outputText}>
            <Text style = {styles.outputText} >x1:  {} </Text> 
         <TextInput style={styles.outputBorder}
         multiline
           value ={(x1.toString())}
         numberOfLines = {1}
        />
        </View>)
        }
        }
        else {
          {
           return (
        <View style = {styles.outputText}>
        <Text style = {styles.outputX}>The equation has no solution! {"\n"} 
        </Text>
         </View>)
        }
        }
      }
  }
  useEffect(() => {
    const handleOrientationChange = () => {
      const screen = Dimensions.get('window');
      setBtnHeight(screen.height/8);
    };
  Dimensions.addEventListener('change', handleOrientationChange);
  }, []);

  function calcu(mode,texts){
  if(mode==0){
    t = texts.replace("sqrt","Math.sqrt");
    t = t.replace("^","**");
    t = eval(t);
    onChangeText(t);
  if(!check_history){
    get_history();
    saveData("ID",history+ "\n"+ texts+' = ' + t);
  }
  }
  else if(mode ==1){
    if(state==0)
    {
      delta = b*b-4*a*c;
      if(delta>0){
        changeval1((-b+Math.sqrt(delta))/(2*a));
        //changeval1(delta)
        changeval2((-b-Math.sqrt(delta))/(2*a))
      }
      else if(delta==0){
        changeval1((-b)/(2*a));
        changeval2(NaN);
      }
      else {
        changeval1(NaN);
        changeval2(NaN);
      }
    }
    change_state((state+1)%2);
  }
}

  return (
    <SafeAreaView style={styles.container}>
        {setmode()}
        <View style = {styles.row}>
       <TouchableOpacity  style={[styles.button,{height:buttonHeight,backgroundColor:"red"}]} onPress = {()=>{onChangeText(""), change(0);change_a(0);change_b(0);change_c(0);setmode(mode);change_state(0)}}>
            <Text style={styles.text}>{"Clear"} </Text>
          </TouchableOpacity>
      <TouchableOpacity  style={[styles.button,{height:buttonHeight}]} onPress = {()=>{changeMode()}}>
            <Text style={styles.text}>{"Mode"} </Text>
          </TouchableOpacity>
        </View>
      <View style = {styles.row}>
          <TouchableOpacity  style={[styles.button,{height:buttonHeight}]} onPress = {()=>{change_historymode(!check_history);if(!check_history) {get_history()}}}>
            <Text style={styles.text}>{"Ans"}</Text>
          </TouchableOpacity>
            <TouchableOpacity  style={[styles.button,{height:buttonHeight}]} onPress = {()=>{ calcu(mode,texts);}}>
            <Text style={styles.text}>{"="}</Text>
          </TouchableOpacity>
          
      </View>
    </SafeAreaView>

  );
}


var screen = Dimensions.get("window");
var buttonWidth = screen.width / 4;
const styles = StyleSheet.create({
   button: {
    backgroundColor: "#333333",
    flex: 1,
    width: buttonWidth,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Math.floor(buttonWidth),
    margin: 5,
  },
  output:{
    flex:1,
    fontSize: 42,
    textAlign:"right",
    lineHeight:42,
    marginRight:20,
    borderColor:"black",
    borderWidth:1,
    justifyContent: "flex-end",
  },
  outputBorder:{
    fontSize: 42,
    textAlign:"right",
    lineHeight:42,
    borderColor:"black",
    borderWidth:1,
    justifyContent: "flex-end",
  },
  outputText:{
  fontSize: 25,
  textAlign:"left",
  lineHeight:25,
},
 outputX:{
  fontSize: 30,
  textAlign:"center",
  lineHeight:30,
},
  row:{
    flexDirection : "row",
  },
  text: {
    color: "#fff",
    fontSize: 24,
  },
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    padding: 8,
    justifyContent: "flex-end",
  },
});
const Row = ({ children }) => {
  return <View style={styles.row}>{children}</View>;
};