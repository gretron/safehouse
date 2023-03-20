import { useMemo, useState } from "react";
import { useMqttContext } from "./useMqttContext";

export const useSubscription = (topic) => {
  const [amessage, asetMessage] = useState(null);
  const { client, message } = useMqttContext();

  if (client) {
    client.subscribe(topic);
  }

  useState(() => {
    if (message) {
      asetMessage(message.payloadString);
    }
  }, [message]);

  return { message };
};
