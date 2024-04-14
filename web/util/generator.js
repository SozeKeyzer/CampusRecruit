import generator from 'generate-password';

const genPas = ()=>{
      const gen_pass=generator.generate({
        length: 10,
        numbers: true
      });
      return gen_pass;
}

export default genPas;