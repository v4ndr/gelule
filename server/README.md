## security check
- [x] shema for validate session object 
- [x] cors domain validation 
- [ ] token validation generated by pin 
- [ ] minimy client js 
- [x] extension non repertoriée 

## user authentification flow
1. questionnaire <br/>
2. generation du PIN à 4 chiffres <br/>
3. communication du lien privé + PIN + expiraton date <br/>

### PIN
    - generation par le serveur sur demande admin avec token secret
    - PIN random, si existe pas : stocker dans bdd avec expiration date, et bool valid
    - à chaque query de la BDD pour pin : check des exp de tous les pins valides