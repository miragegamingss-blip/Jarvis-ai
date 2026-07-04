import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Animated,
  Easing,
} from 'react-native';
import Voice from '@react-native-voice/voice';
import Tts from 'react-native-tts';
import ArcReactor from './src/components/ArcReactor';
import Terminal from './src/components/Terminal';
import { processCommand } from './src/utils/jarvisLogic';

const App = () => {
  const [terminal, setTerminal] = useState([
    '> System framework armed.',
  ]);
  const [textInput, setTextInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [systemStatus, setSystemStatus] = useState('SYS_STATUS: ONLINE');
  const [liveTime, setLiveTime] = useState('00:00:00');

  useEffect(() => {
    initializeVoice();
    initializeTTS();
    
    const clockInterval = setInterval(() => {
      const now = new Date();
      setLiveTime(now.toLocaleTimeString());
    }, 1000);

    return () => clearInterval(clockInterval);
  }, []);

  const initializeVoice = async () => {
    try {
      Voice.onSpeechStart = () => setIsListening(true);
      Voice.onSpeechEnd = () => setIsListening(false);
      Voice.onSpeechResults = (e) => {
        const transcript = e.value[0].toLowerCase().trim();
        addLog(`You (Voice): ${transcript}`);
        handleCommand(transcript);
      };
      Voice.onSpeechError = (e) => {
        addLog(`Voice Error: ${e.error}`);
      };
    } catch (error) {
      addLog('Voice initialization failed.');
    }
  };

  const initializeTTS = async () => {
    try {
      Tts.setDefaultLanguage('en-US');
      Tts.setDefaultRate(0.9);
      Tts.setDefaultPitch(1.0);
    } catch (error) {
      console.log('TTS initialization failed:', error);
    }
  };

  const startListening = async () => {
    try {
      await Voice.start('en-US');
      addLog('> Microphone actively listening...');
    } catch (error) {
      addLog('> Voice engine standby.');
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
    } catch (error) {
      console.log(error);
    }
  };

  const speak = (text) => {
    Tts.speak({
      text: text,
      androidParams: {
        KEY_PARAM_PAN: -1,
        KEY_PARAM_VOLUME: 0.5,
        KEY_PARAM_STREAM: 'STREAM_MUSIC',
      },
    });
  };

  const addLog = (message) => {
    setTerminal((prev) => [...prev, message]);
  };

  const handleCommand = (cmd) => {
    const response = processCommand(cmd);
    if (response.speech) {
      speak(response.speech);
    }
    if (response.log) {
      addLog(`JARVIS: ${response.log}`);
    }
  };

  const sendTextCommand = () => {
    if (!textInput.trim()) return;
    const cmd = textInput.trim();
    addLog(`You: ${cmd}`);
    handleCommand(cmd.toLowerCase());
    setTextInput('');
  };

  const bootSystem = () => {
    addLog('> Initializing sequence...');
    setTimeout(() => {
      speak('Welcome Hari. I am online and tracking. All systems are operating within normal parameters.');
      addLog('JARVIS: Welcome Hari. Systems online.');
      startListening();
    }, 800);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerInfo}>
        <Text style={styles.headerText}>{systemStatus}</Text>
        <Text style={styles.headerText}>{liveTime}</Text>
      </View>

      <ArcReactor />

      <View style={styles.panel}>
        <Terminal logs={terminal} />
        
        <View style={styles.inputGroup}>
          <TextInput
            style={styles.textInput}
            placeholder="Ask Jarvis anything..."
            placeholderTextColor="#00f0ff"
            value={textInput}
            onChangeText={setTextInput}
            onSubmitEditing={sendTextCommand}
          />
          <TouchableOpacity style={styles.button} onPress={sendTextCommand}>
            <Text style={styles.buttonText}>Send</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <TouchableOpacity 
            style={[styles.button, { flex: 1 }]} 
            onPress={isListening ? stopListening : startListening}
          >
            <Text style={styles.buttonText}>
              {isListening ? 'Listening...' : 'Speak'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={bootSystem}>
            <Text style={styles.buttonText}>Boot</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#03070d',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerInfo: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 240, 255, 0.3)',
  },
  headerText: {
    fontSize: 10,
    color: '#00f0ff',
    letterSpacing: 1,
  },
  panel: {
    width: '100%',
    gap: 10,
    marginTop: 10,
  },
  inputGroup: {
    flexDirection: 'row',
    gap: 8,
  },
  textInput: {
    flex: 1,
    backgroundColor: 'rgba(0, 20, 40, 0.5)',
    borderWidth: 1,
    borderColor: '#00f0ff',
    color: '#00f0ff',
    padding: 12,
    borderRadius: 6,
    fontFamily: 'monospace',
  },
  button: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#00f0ff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#00f0ff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 12,
    letterSpacing: 1,
  },
});

export default App;
