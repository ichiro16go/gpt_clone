import React, { FC, useState, useCallback, useEffect } from "react";
import { Log } from "./data/types";
import { Messages } from "./components/MessageRoom.tsx";
import { Input } from "./components/inputForm.tsx";
import { createAiLog, createMyLog, scrollToBottom } from "./utils/utils.tsx";
import { useCompleteText } from "./completeText.ts";

const App: FC = () => {
  const chatRoom: string[] = ["room1", "room2","room3", "room4",];
  const [selectedRoom, setSelectedRoom] = useState(0);
  //UI用
  const [logs, setLogs] = useState<Log[][]>(
    chatRoom.map(() => [createAiLog("congraturation")])
  );
  const completeText = useCompleteText();
  //AI用
  const [memory, setMemory] = useState<string[]>(chatRoom.map(() => ""));
  const [shouldScrollBottom, setShouldScrollBottom] = useState(false);

  useEffect(() => {
    if (shouldScrollBottom) {
      setShouldScrollBottom(false);
      scrollToBottom();
    }
  }, [shouldScrollBottom]);
  //メッセージ送信時の処理
  const handleSubmit = useCallback(
    async (text: string) => {
      const sayAi = (message: string): void => {
        setLogs((prev) => {
          const newLogs = [...prev];
          newLogs[selectedRoom] = [...newLogs[selectedRoom], createAiLog(message)];
          return newLogs;
        });
        setShouldScrollBottom(true);
      };

      if (!completeText) {
        return;
      }
      const prompt = `The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.

${memory[selectedRoom].trim()}
Human: ${text}
AI: `;
      completeText(prompt)
        .then((res) => {
          const newText = res.slice(prompt.length);
          sayAi(newText);
          setMemory((prev) => {
            const newMemory = [...prev];
            newMemory[selectedRoom] = `${newMemory[selectedRoom]}AI: ${newText.trim()}\n`;
            return newMemory;
          });
        })
        .catch(() => {
          setLogs((prev) => {
            const newLogs = [...prev];
            newLogs[selectedRoom] = [
              ...newLogs[selectedRoom],
              createAiLog("エラーが発生しました。もう一度お試しください。"),
            ];
            return newLogs;
          });
          setShouldScrollBottom(true);
        });

      setLogs((prev) => {
        const newLogs = [...prev];
        newLogs[selectedRoom] = [...newLogs[selectedRoom], createMyLog(text)];
        return newLogs;
      });
      setMemory((prev) => {
        const newMemory = [...prev];
        newMemory[selectedRoom] = `${newMemory[selectedRoom]}Human: ${text}\n`;
        return newMemory;
      });
      setShouldScrollBottom(true);
    },
    [completeText, memory, selectedRoom]
  );

  return (
    <div className="w-full min-h-screen h-full flex bg-[#d3d3d3]">
      {/* 左側のタブ */}
      <div className="w-1/4 min-h-screen bg-white shadow-md">
        <ul className="p-5 list-none">
          {chatRoom.map((room, index) => (
            <li
              key={index}
              onClick={() => setSelectedRoom(index)}
              className={`mb-4 text-lg cursor-pointer ${
                index === selectedRoom
                  ? "text-blue-500 font-bold border-l-4 border-blue-500 pl-2"
                  : "text-gray-700"
              }`}
            >
              {room}
            </li>
          ))}
        </ul>
      </div>

      {/* メインコンテンツ */}
      <div className="flex-1 pt-10 pb-12 px-5 max-w-[600px]">
        <Messages logs={logs[selectedRoom]} />
        <div className="w-full h-40" />
      </div>

      {/* 入力フィールド */}
      <div className="fixed bottom-0 left-0 w-full h-40 flex justify-center items-center bg-transparent ">
        <Input onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default App;