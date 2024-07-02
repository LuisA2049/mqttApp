import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { MqttClient } from "./client/mqttClient";


export default component$(() => {


  return (
      <div>
        <h1>Bienvenido a Qwik con MQTT</h1>
        <MqttClient />
      </div>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
