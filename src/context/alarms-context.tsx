"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  PropsWithChildren,
} from "react";

export type Alarm = {
  id: string;
  time: string;
  repeat: string;
  sound: string;
  vibration: boolean;
  game: string | null;
  active: boolean;
};

const STORAGE_KEY = "alarms";

const AlarmsContextR = createContext<{
  alarms: Alarm[];
  addAlarm: (alarm: Omit<Alarm, "id" | "active">) => void;
  toggleAlarm: (id: string) => void;
} | null>(null);

export function AlarmsContext({ children }: PropsWithChildren) {
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (stored) setAlarms(JSON.parse(stored));
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(alarms));
    } catch {}
  }, [alarms, loaded]);

  function addAlarm(alarm: Omit<Alarm, "id" | "active">) {
    setAlarms((prev) => [
      ...prev,
      { ...alarm, id: Date.now().toString(), active: true },
    ]);
  }

  function toggleAlarm(id: string) {
    setAlarms((prev) =>
      prev.map((alarm) =>
        alarm.id === id ? { ...alarm, active: !alarm.active } : alarm,
      ),
    );
  }

  return (
    <AlarmsContextR.Provider value={{ alarms, addAlarm, toggleAlarm }}>
      {children}
    </AlarmsContextR.Provider>
  );
}

export function useAlarmsContext() {
  const context = useContext(AlarmsContextR);
  if (!context) {
    throw new Error("useAlarmsContext must be used within an AlarmsContext");
  }
  return context;
}
