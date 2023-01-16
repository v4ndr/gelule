## STATE MANAGMENT

State managment is essential to maintain consistency between front and back logic. The possibility of ressearchs on multiple tabs make state managment moreover important.

4 main states are :
    * AUTH : at first launch *gelule* asks for a pin code, on front side there 2 more sub states :
        * AUTH_SUCCESS
        * AUTH_ERROR
    * INACTIVE : when the extension is inactive
    * ACTIVE : when activity is beeing watched
    * ASK : at the end of a session *gelule* ask the use if he found his answer, the answer to this question ends the session, on front side, there is one more sub state :
        * ASK_SUCCESS

The background page keeps track of the state and communicate it to the front as needed. At every reload / url change the front code of *gelule* is injected in the web page visited, and it sends a message to "GET_STATUS".
The front on its side, handle user interaction and fires "SET_STATUS" to the background page if needed. A minimal front logic exists to handle transition betwwen states on front side, it is why sub state (AUTH_SUCCESS, AUTH_ERROR and ASK_SUCCESS) exists
