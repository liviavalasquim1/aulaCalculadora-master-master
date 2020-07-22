import { Component } from '@angular/core';
import { evaluate } from 'mathjs';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public calculo = ''; // vazia
  public resultado: string; // null

  private ponto = false; // nao tem um ponto na tela, começa como falsa

  private operacoes = ['+', '-', '*', '/'];

  constructor(public alertController: AlertController) {}

  public adicionarNumero(valor: string){
    if(this.resultado){ // se o resultado ja foi apresentado....
      this.apagarTudo(); // apagar tudo
    }
    this.calculo = this.calculo + valor;
  }

  public adicionarPonto() {

    if (this.ponto){ // verificar se tem ponto na tela
      return; // quando clicar no ponto e estiver positiva, vai retornar vazia - vai parar a execução
    }

    this.calculo += "."; // só executa se tiver ponto
    this.ponto = true; // só executa se tiver ponto
  }

  public adicionarOperacao(operador: string){

    if(this.resultado){ // se o campo resposta ja estiver preenchido...
      this.calculo = this.resultado.toString(); //converter o resultado p/ texto e manda-lo p/ dentro do calculo
      this.resultado = null; // limmpar o campo resultado
    }

    const ultimo = this.calculo.slice(-1); // pegar o ultimo caracter
    if(this.operacoes.indexOf(ultimo) > -1) { // procura se o ultimo caracter é uma das 'operacoes'
      return; // se o indexOf não encontrar ele retorna -1, se o num for maior que -1 ele da um return
    } 
      

    this.calculo += operador;
    this.ponto = false; // toda vez que adicionar uma operação, deixar o ponto falso
  }

  public apagarTudo(){
    // zerar variaveis de calculo e resultado
    this.calculo = '';
    this.resultado = null;
    this.ponto = false; // zerar a variavel ponto
  }

  public apagarUltimo(){
    const ultimo = this.calculo.slice(-1); // pegar o ultimo caracter
    if(ultimo == '.') { // se o ultimo caracter for igual a ponto
      this.ponto = false; // transforma em falso se for um ponto
    }
   
    this.calculo = this.calculo.slice(0, -1); 
    // slice - (inicio, final); se o inicio > final, retorna texto vazio; 
                             // se inicio = negativo, pega caracteres a partir  do final do texto     
  }

  public calcularResultado(){
    try{ // tentar executar o codigo abaixo
      this.resultado = evaluate(this.calculo); // toda vez que clicar no sinal de = ele vai chamar a função evaluate do mathjs 
                                            // e executar o que estiver na linha do calculo
    }catch (e){ // caso ocorra um erro....
      this.resultado = ''; // o resultado vai zerar
      this.presentAlert('ERRO!!!', 'Cálculo inválido, verifique!'); 
      // mensagem que vai aparecer caso a conta apresente algum erro
    }
  }
  async presentAlert(titulo:string, mensagem:string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensagem,
      buttons: ['OK']
    });

    await alert.present();
  }

}
