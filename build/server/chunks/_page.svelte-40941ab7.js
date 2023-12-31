import { c as create_ssr_component, o as onDestroy, b as add_attribute } from './index2-29026190.js';
import { s as socketConnection, u as userName, g as goto } from './navigation-0df9e63d.js';
import { io } from 'socket.io-client';
import './index-db5b8b39.js';

const css = {
  code: "body{font-family:'Roboto', sans-serif;font-size:0.95rem;margin:0;padding:0;box-sizing:border-box;background:#212121}main.svelte-1bffzow.svelte-1bffzow,header.svelte-1bffzow.svelte-1bffzow{color:whitesmoke}header.svelte-1bffzow h1.svelte-1bffzow{text-align:center;text-transform:uppercase;font-size:3rem;line-height:3rem}header.svelte-1bffzow h1 span.svelte-1bffzow{display:block;font-size:2.37rem;line-height:2rem}main.svelte-1bffzow.svelte-1bffzow{width:max-content;height:fit-content;display:flex;flex-direction:column;margin:auto;gap:2rem}.username-sec.svelte-1bffzow.svelte-1bffzow{text-align:center;display:flex;flex-direction:column;gap:0.5rem}.username-sec.svelte-1bffzow button.svelte-1bffzow{width:30%}.create-sec.svelte-1bffzow button.svelte-1bffzow{width:100%}.unirse-sec.svelte-1bffzow.svelte-1bffzow{text-align:center;display:flex;flex-direction:column;gap:1rem}input.svelte-1bffzow.svelte-1bffzow{padding:10px;border-radius:10px;font-size:1rem}input.svelte-1bffzow.svelte-1bffzow:focus{border:none;outline:none;font-family:'Roboto', sans-serif}button.svelte-1bffzow.svelte-1bffzow{border-radius:10px;border-style:none;padding:0.5rem 1rem;background:#EBD18D;cursor:pointer;color:black}button.svelte-1bffzow.svelte-1bffzow:hover{background:#f3ead2}h4.svelte-1bffzow.svelte-1bffzow{justify-content:center;text-align:center}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let socket;
  let meUser;
  let roomT = "";
  socketConnection.update(() => io());
  const unsubscribe = socketConnection.subscribe((value) => {
    socket = value;
  });
  const unsubscribeUser = userName.subscribe((value) => {
    meUser = value;
  });
  const handleRoomValid = (data) => {
    goto(`/${data}`);
    roomT = "";
    console.log("is valid route");
  };
  const handelRoomNoValid = () => {
    console.log("No valid route");
  };
  onDestroy(() => {
    unsubscribe();
    unsubscribeUser();
    socket.off("room:valid", handleRoomValid);
    socket.off("room:novalid", handelRoomNoValid);
  });
  $$result.css.add(css);
  return `${$$result.head += `<!-- HEAD_svelte-1r8le8o_START -->${$$result.title = `<title>Video Conference</title>`, ""}<!-- HEAD_svelte-1r8le8o_END -->`, ""}

<header class="svelte-1bffzow"><h1 class="svelte-1bffzow">Video app<span class="svelte-1bffzow">Conference</span></h1></header>

<main class="svelte-1bffzow"><section class="username-sec svelte-1bffzow"><label for="username">Username</label>
        <input${add_attribute("value", meUser, 0)} type="text" name="username" id="username"${add_attribute("style", "border: none;", 0)} ${""} class="svelte-1bffzow">
        <button class="svelte-1bffzow">Set</button></section>
    
    <section class="create-sec svelte-1bffzow"><button class="svelte-1bffzow">Crear sala</button></section>
    
    <section><h4 class="svelte-1bffzow">O</h4>
        <form class="unirse-sec svelte-1bffzow"><label for="texto">Unirse a sala</label>
            <input${add_attribute("value", roomT, 0)} type="text" name="texto" id="texto" class="svelte-1bffzow">
            <button class="svelte-1bffzow">Entrar</button></form></section>    
</main>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-40941ab7.js.map
