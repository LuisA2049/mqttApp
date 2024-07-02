// src/components/MqttClient.tsx
import { component$, useStore,  noSerialize, type NoSerialize  } from '@builder.io/qwik';
import mqtt from 'mqtt';

export const MqttClient = component$(() => {

    const state = useStore<{
        client: NoSerialize<mqtt.MqttClient> | null,
        messages: string[]
      }>({
        client: null,
        messages: []
      });

      if (!state.client) {
        // Conectar al broker MQTT
        const client = mqtt.connect('mqtt://144.24.40.252:1883');
        state.client = noSerialize(client);

        // Manejar eventos de conexión
        state.client.on('connect', () => {
          console.log('Conectado al broker MQTT');
          state.client.subscribe('testtopic/#');
          state.client.publish("testtopic", "Hello mqtt, ya lo hice jalar desde qwik");
        });
    
        // Manejar mensajes entrantes
        state.client.on('message', (topic, message) => {
          console.log(`Mensaje recibido en ${topic}: ${message.toString()}`);
          state.messages.push(message.toString());
        });
      }


     
  return (
    <div>
      <h1>Cliente MQTT</h1>
      <ul>
        {state.messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
});
