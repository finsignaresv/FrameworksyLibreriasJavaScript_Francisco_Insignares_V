var ruta = "";
var r = "<img src = '";
var s = "' class = 'elemento'/>";
var t = "' class = 'elemento nuevaVertical' style='position:absolute;'/>";
var u = "' class = 'elemento nuevaHorizontal' style='position:absolute;'/>";
var imagen = "";
var imagenAnimate = "";
var rutaImagen = "";
var rutaImagenNueva = "";
var rutaImagenNuevaVertical = "";
var rutaImagenNuevaHorizontal = "";
var subClase = "col-";
var ultimoTipo = " .elemento:last-of-type"
var i = "";
var j = "";
var w = "";
var x = "";
var y = "";
var z = "";
var m = "";
var n = "";
var xMax= "";
var yMax = "";
var elemento1 = "";
var elemento2 = "";
var comparacion = "";
var col1 = "";
var col2 = "";
var col3 = "";
var col4 = "";
var col5 = "";
var col6 = "";
var col7 = "";
var pos1 = 147.93333435058594;
var dispararAnimacion = 0;
var finalizar = false;
var elementos = "";
var coordXElementoOculto = "";
var coordYElementoOculto = "";
var parametro = "";
var elementosRepetidos = "";
var repetidosenLinea = 0;
var repetidosCuadro = 0;
var repetidosVerticalX = new Array();
var repetidosVerticalY = new Array();
var repetidosConsecutivosVertical = new Array();
var repetidosHorizontalX = new Array();
var repetidosHorizontalY = new Array();
var repetidosConsecutivosHorizontal = new Array();
var coordXOculto = new Array();
var coordYOculto = new Array();
var nuevosElementos = new Array();
var posicionesMatriz = new Array();
var matrizPosicionTop = new Array();
var arreglo = new Array();
var posicionTop = "";
var posicionTopAnimate = "";
var primeroDiferenteAnteriorV = "";
var primeroIgualSegundoV = "";
var segundoIgualTerceroV = "";
var terceroDiferenteCuartoV = "";
var cuartoDiferenteQuintoV = "";
var quintoDiferenteSextoV = "";
var sextoDiferenteSeptimoV = "";
var mayorRepetidoAnimate = "";
var mayorRepetido = 0;
var mayorRepetidoVertical = 0;
var mayorRepetidoVerticalAnimate = "";
var mayorRepetidoHorizontal = 0;
var mayorRepetidoHorizontalAnimate = "";
coordX = "";
coordY = "";
coordXVertical = "";
coordYVertical = "";
coordXHorizontal = "";
coordYHorizontal = "";
score = 0;


//Codigo para eliminar conflictos entre jquery y prototype
var $j = jQuery.noConflict();
$j(document).ready(function()
  {
//    alert("Si salgo es que no hay conflicto!!!");
  });


//Funcion para que cargue todo el documento antes de ejecutar las operaciones siguientes
$j(document).ready(function()
  {
    //Funcion autoejecutable para generar el efecto de cambio de color en el titulo
    $j(function()
      {
        setInterval(function()
          {
            var color = $j("#main-titulo").css("color");
            if (color == "rgb(220, 255, 14)")
              {
                $j("#main-titulo").css("color","white");
              }
              else
                {
                  $j("#main-titulo").css("color", "rgb(220, 255, 14)");
                }
          },500);
      })
  });

  var timer = new Timer(
      {
        tick : 1,
        ontick : function (sec)
          {
            console.log('interval', sec);
            remainTime = (sec + 1000) / 1000;
            remainSeconds = ('0' + Math.floor((remainTime) % 60)).slice(-2);
            remainMinutes = ('0' + Math.floor((remainTime / 60) % 60)).slice(-2);
            $j('#timer').html(remainMinutes + ":" + remainSeconds);
          },
          onstart : function()
            {
              console.log('timer started');
            }
      });

  //Definiendo opciones usadas sobre
  timer.on('end', function ()
    {
      console.log('timer ended');
      this.start(0).off('end');
    });

  //Iniciar el contador para 10 segundos

  iniciarReloj = function()
    {
      timer.start(120);
    }

      //Funcion que genera una imagen aleatoria
      rutaAleatoria = function()
        {
          var numero = Math.floor((Math.random() * 4) + 1);
          var imagen = "image/" + numero + ".png";
          return imagen
        }

      //Funcion que genera una ruta de imagen aleatoria
      generarImagenAleatoria = function()
        {
          imagen = rutaAleatoria();
          rutaImagen = r + imagen + s;
          rutaImagenNuevaVertical = r + imagen + t;
          rutaImagenNuevaHorizontal = r + imagen + u;
          return rutaImagen;
        }

      //Funcion para llevar el tablero con imagenes aleatorias
      llenarTablero = function()
        {
          for (i = 0; i < 8; i++)
            {
              generarImagenAleatoria();
              var clase = subClase + i;
              $j(".col-"+i).html(rutaImagen);
            }

          for (i = 0; i < 6; i++)
            {
              for (j = 1; j < 8; j++)
                {
                  generarImagenAleatoria();
                  var clase = subClase + i;
                  $j(".col-" + j + " .elemento:last-of-type").after(rutaImagen);
                }
            }
        }

      conformarMatriz = function()
        {
          col1 = $j('.col-1 .elemento');
          col2 = $j('.col-2 .elemento');
          col3 = $j('.col-3 .elemento');
          col4 = $j('.col-4 .elemento');
          col5 = $j('.col-5 .elemento');
          col6 = $j('.col-6 .elemento');
          col7 = $j('.col-7 .elemento');

          elementos = [col1, col2, col3, col4, col5, col6, col7];
        }

      obtenerPosicionesElementos = function()
        {
          for (i = 0; i < 7; i ++)
            {
              for (j = 0; j < 7; j ++)
                {
                  posicionesMatriz.push($j(elementos[i][j]).position());
                }
            }
        }

      obtenerMatrizAbsoluta = function()
        {
          z = 0;
          for (x = 0; x < 7; x ++)
            {
              for (y = 0; y < 7; y ++)
                {
                  $j(elementos[x][y]).css('position','absolute');
                  $j(elementos[x][y]).css('top',posicionesMatriz[z].top);
                  z++;
                }
            }
        }


        //elemento1 = $$('body div div div')[0].childElements()[0];
      //console.log("elemento1: " + elemento1.inspect());

condicionalesVertical = function()
  {
    primeroDiferenteAnteriorV = ($j(elementos[x][y]).attr('src')) !== ($j(elementos[x][y-1]).attr('src'));
    primeroIgualSegundoV = ($j(elementos[x][y]).attr('src')) == ($j(elementos[x][y+1]).attr('src'));
    segundoIgualTerceroV = ($j(elementos[x][y+1]).attr('src')) == ($j(elementos[x][y+2]).attr('src'));
    terceroDiferenteCuartoV = ($j(elementos[x][y+2]).attr('src')) !== ($j(elementos[x][y+3]).attr('src'));
    cuartoDiferenteQuintoV = ($j(elementos[x][y+3]).attr('src')) !== ($j(elementos[x][y+4]).attr('src'));
    quintoDiferenteSextoV = ($j(elementos[x][y+4]).attr('src')) !== ($j(elementos[x][y+5]).attr('src'));
    sextoDiferenteSeptimoV = ($j(elementos[x][y+5]).attr('src')) !== ($j(elementos[x][y+6]).attr('src'));
  }

repetidosVertical = function()
  {
    repetidosCuadro++;
    repetidosVerticalX.push(x);
    repetidosVerticalY.push(y);
  }

repetidosHorizontal = function()
  {
    repetidosCuadro++;
    repetidosHorizontalX.push(x);
    repetidosHorizontalY.push(y);
  }

buscarRepetidosVertical = function()
  {
    for (x = 0; x < 7; x ++)
    {
      for (y = 0; y < 7; y ++)
        {
          condicionalesVertical();
          if ((primeroDiferenteAnteriorV && (primeroIgualSegundoV)) && (segundoIgualTerceroV))
            {
              if (terceroDiferenteCuartoV)
                {
                  repetidosVertical();
                  repetidosenLinea = 3;
                  repetidosConsecutivosVertical.push(repetidosenLinea);
                }
                else
                  {
                    if (cuartoDiferenteQuintoV)
                      {
                        repetidosVertical();
                        repetidosenLinea = 4;
                        repetidosConsecutivosVertical.push(repetidosenLinea);
                      }
                      else
                        {
                          if (quintoDiferenteSextoV)
                            {
                              repetidosVertical();
                              repetidosenLinea = 5;
                              repetidosConsecutivosVertical.push(repetidosenLinea);
                            }
                            else
                              {
                                if (sextoDiferenteSeptimoV)
                                  {
                                    repetidosVertical();
                                    repetidosenLinea = 6;
                                    repetidosConsecutivosVertical.push(repetidosenLinea);
                                  }
                                  else
                                    {
                                      repetidosVertical();
                                      repetidosenLinea = 7;
                                      repetidosConsecutivosVertical.push(repetidosenLinea);
                                    }
                              }
                        }
                  }
            }
        }
    }
  }

  buscarRepetidosHorizontal = function()
    {
      for (x = 0; x < 5; x ++)
        {
          for (y = 0; y < 7; y ++)
            {
              if ((((x+2)<7) && (($j(elementos[x][y]).attr('src')) == ($j(elementos[x+1][y]).attr('src')))) && (($j(elementos[x+1][y]).attr('src')) == ($j(elementos[x+2][y]).attr('src'))))
                {
                  if (((x > 3) && (x < 5)) && (($j(elementos[x][y]).attr('src')) !== ($j(elementos[x-1][y]).attr('src'))))
                    {
                      repetidosHorizontal();
                      repetidosenLinea = 3;
                      repetidosConsecutivosHorizontal.push(repetidosenLinea);
                    }


                  else if (x < 1)
                    {
                      if (($j(elementos[x+2][y]).attr('src')) == ($j(elementos[x+3][y]).attr('src')))
                        {
                          if (($j(elementos[x+3][y]).attr('src')) == ($j(elementos[x+4][y]).attr('src')))
                            {
                              if (($j(elementos[x+4][y]).attr('src')) == ($j(elementos[x+5][y]).attr('src')))
                                {
                                  if (($j(elementos[x+5][y]).attr('src')) == ($j(elementos[x+6][y]).attr('src')))
                                    {
                                      repetidosHorizontal();
                                      repetidosenLinea = 7;
                                      repetidosConsecutivosHorizontal.push(repetidosenLinea);
                                    }
                                    else
                                      {
                                        repetidosHorizontal();
                                        repetidosenLinea = 6;
                                        repetidosConsecutivosHorizontal.push(repetidosenLinea);
                                      }
                                }
                                else
                                  {
                                    repetidosHorizontal();
                                    repetidosenLinea = 5;
                                    repetidosConsecutivosHorizontal.push(repetidosenLinea);
                                  }
                            }
                            else
                              {
                                repetidosHorizontal();
                                repetidosenLinea = 4;
                                repetidosConsecutivosHorizontal.push(repetidosenLinea);
                              }
                        }
                        else
                          {
                            repetidosHorizontal();
                            repetidosenLinea = 3;
                            repetidosConsecutivosHorizontal.push(repetidosenLinea);
                          }
                    }

                  else if (((x > 0) && (x < 4)) && ((($j(elementos[x][y]).attr('src')) !== ($j(elementos[x-1][y]).attr('src')))))
                    {
                      if (((x+3) < 7) && ($j(elementos[x+2][y]).attr('src') == ($j(elementos[x+3][y]).attr('src'))))
                        {
                          if (((x+4) < 7) && ($j(elementos[x+3][y]).attr('src') == ($j(elementos[x+4][y]).attr('src'))))
                            {
                              if (((x+5) < 7) && ($j(elementos[x+4][y]).attr('src') == ($j(elementos[x+5][y]).attr('src'))))
                                {
                                  repetidosHorizontal();
                                  repetidosenLinea = 6;
                                  repetidosConsecutivosHorizontal.push(repetidosenLinea);
                                }
                                else
                                  {
                                    repetidosHorizontal();
                                    repetidosenLinea = 5;
                                    repetidosConsecutivosHorizontal.push(repetidosenLinea);
                                  }
                            }
                            else
                              {
                                repetidosHorizontal();
                                repetidosenLinea = 4;
                                repetidosConsecutivosHorizontal.push(repetidosenLinea);
                              }
                        }
                        else
                          {
                            repetidosHorizontal();
                            repetidosenLinea = 3;
                            repetidosConsecutivosHorizontal.push(repetidosenLinea);
                          }
                    }
                }
            }
        }
    }

determinarMayorRepetido = function()
  {
    if (repetidosConsecutivosVertical !== "")
      {
        for (x = 0; x < repetidosConsecutivosVertical.length; x ++)
          {
            if (repetidosConsecutivosVertical[x] > mayorRepetidoVertical)
              {
                mayorRepetidoVertical = repetidosConsecutivosVertical[x];
                coordXVertical = repetidosVerticalX[x];
                coordYVertical = repetidosVerticalY[x];
              }
          }
      }

    if (repetidosConsecutivosHorizontal !== "")
      {
        for (y = 0; y < repetidosConsecutivosHorizontal.length; y ++)
          {
            if (repetidosConsecutivosHorizontal[y] > mayorRepetidoHorizontal)
              {
                mayorRepetidoHorizontal = repetidosConsecutivosHorizontal[y];
                coordXHorizontal = repetidosHorizontalX[y];
                coordYHorizontal = repetidosHorizontalY[y];
              }
          }
      }

    if (mayorRepetidoVertical >= mayorRepetidoHorizontal)
      {
        mayorRepetido = mayorRepetidoVertical;
        coordX = coordXVertical;
        coordY = coordYVertical;
      }
      else
        {
          mayorRepetido = mayorRepetidoHorizontal;
          coordX = coordXHorizontal;
          coordY = coordYHorizontal;
        }
  }

llenarVaciosVertical = function()
  {
    console.log('entro en vertical');

    if ((coordY > 0) && (coordY < 5))
      {
        for (i = 1; i <= (8-mayorRepetidoAnimate); i ++)
          {
            $j(elementos[coordX][coordY-i]).addClass('elementoAnteriorVertical');
          }

      }
      $j('.elementoAnteriorVertical').animate(
        {
          top:'+=96px'
        },200,function()
          {
            $j('.elementoAnteriorVertical').removeClass('elementoAnteriorVertical')
          })

        generarImagenAleatoria();
        $j(".col-" + (coordX+1)).prepend(rutaImagenNuevaVertical);

        $j('.nuevaVertical').animate(
          {
            top: '+=96px'
          },200,function()
            {
              $j('.nuevaVertical').removeClass('nuevaVertical');
            });
    iniciarMatrices();
    iniciarElementos();
  }

llenarVaciosHorizontal = function()
    {
      setTimeout(function()
        {
          if (coordY > 0)
            {
              for (i = 0; i < mayorRepetidoAnimate; i ++)
                {
                  for (j = 1; j <= coordY; j ++)
                    {
                      $j(elementos[coordX+i][coordY-j]).addClass('elementoAnteriorHorizontal');
                    }
                }
            }

          $j('.elementoAnteriorHorizontal').animate(
            {
              top:'+=96px'
            },200);

          for (j = 0; j < mayorRepetidoAnimate; j ++)
            {
              generarImagenAleatoria();
              $j(".col-" + (coordX+j+1)).prepend(rutaImagenNuevaHorizontal);
            }

          $j('.nuevaHorizontal').animate(
            {
              top: '+=96px'
            },1000,function()
              {
                $j('.nuevaHorizontal').removeClass('nuevaHorizontal');
              });

          iniciarMatrices();
          iniciarElementos();
        },1000)
    }

iniciarElementos = function()
  {
    $j('.elementoAnteriorVertical').removeClass('elementoAnteriorVertical');
    $j('.elementoAnteriorHorizontal').removeClass('elementoAnteriorHorizontal');
    $j('.elementoIgualVertical').remove();
    $j('.elementoIgualHorizontal').remove();
  }

iniciarMatrices = function()
  {
    repetidosVerticalX.length = 0;
    repetidosVerticalY.length = 0;
    repetidosConsecutivosVertical.length = 0;
    repetidosHorizontalX.length = 0;
    repetidosHorizontalY.length = 0;
    repetidosConsecutivosHorizontal.length = 0;
    coordXOculto.length = 0;
    coordYOculto.length = 0;
    nuevosElementos.length = 0;
    posicionesMatriz.length = 0;

    repetidoVerticalX = "";
    repetidoHorizontalX = "";
    repetidoVerticalY = "";
    repetidoHorizontalY = "";
    coordXVertical = "";
    coordXHorizontal = "";
    coordYVertical = "";
    coordYHorizontal = "";
    mayorRepetidoHorizontalAnimate = "";
    mayorRepetidoVerticalAnimate = "";
    mayorRepetidoVericalAnimate = "";
    mayorRepetidoHorizontalAnimate = "";
    mayorRepetidoHorizontal = "";
    mayorRepetidoVertical = "";
  }

animacionOcultarRepetidos = function()
  {
    if (mayorRepetidoVertical >= mayorRepetidoHorizontal)
      {
        m = 0;
        for (m = 0; m < mayorRepetido; m ++)
          {
            $j(elementos[coordX][coordY+m]).addClass('elementoIgualVertical');
          }
          mayorRepetidoVerticalAnimate = mayorRepetidoVertical;
          mayorRepetidoHorizontalAnimate = mayorRepetidoHorizontal;
          mayorRepetidoAnimate = mayorRepetido;
          $j('.elementoIgualVertical').animate(
            {
              opacity:0
            },100,function()
              {
                $j(this).animate(
                  {
                    opacity:100
                  },100,function()
                    {
                      $j(this).animate(
                        {
                          opacity:0
                        },100,function()
                          {
                            $j(this).animate(
                              {
                                opacity:100
                              },100,function()
                                {
                                  $j(this).animate(
                                    {
                                      opacity:0
                                    },100,llenarVaciosVertical);
                                }
                             )
                          }
                       )
                    }
                 )
              }
          )


      }

      else if (mayorRepetidoHorizontal > mayorRepetidoVertical)
        {
          n = 0;
          for (n = 0; n < mayorRepetido; n ++)
            {
              $j(elementos[coordX+n][coordY]).addClass('elementoIgualHorizontal');
            }
            mayorRepetidoVerticalAnimate = mayorRepetidoVertical;
            mayorRepetidoHorizontalAnimate = mayorRepetidoHorizontal;
            mayorRepetidoAnimate = mayorRepetido;
            $j('.elementoIgualHorizontal').animate(
              {
                opacity:0
              },100,function()
                {
                  $j(this).animate(
                    {
                      opacity:100
                    },100,function()
                      {
                        $j(this).animate(
                          {
                            opacity:0
                          },100,function()
                            {
                              $j(this).animate(
                                {
                                  opacity:100
                                },100,function()
                                  {
                                    $j(this).animate(
                                      {
                                        opacity:0
                                      },100);
                                  }

                                )
                            }
                        )
                      }
                  )
                }
            )

        }
  }


$j(function()
  {
    $j("#btn-reinicio").on("click", function()
      {
        iniciarReloj();
        setInterval(function()
          {
            conformarMatriz();
            movimientos();
          },4000);
      })
  })

    movimientos = function()
      {
        setTimeout(function()
          {
            buscarRepetidosVertical();
            console.log(repetidosConsecutivosVertical);
            console.log(repetidosVerticalX);
            console.log(repetidosVerticalY);

            buscarRepetidosHorizontal();
            console.log(repetidosConsecutivosHorizontal);
            console.log(repetidosHorizontalX);
            console.log(repetidosHorizontalY);

            determinarMayorRepetido();
            console.log("Mayor repetido: " + mayorRepetido);
            console.log("CoordX: " + coordX);
            console.log("CoordY: " + coordY);

            animacionOcultarRepetidos();
            if (mayorRepetido != "")
              {
                score = score + 1;
              }
            $j('#score-text').html(score);
            if (mayorRepetidoHorizontal > mayorRepetidoVertical)
                {
                  llenarVaciosHorizontal();
                }

          },1000);
      }


llenarTablero();
conformarMatriz();
obtenerPosicionesElementos();
obtenerMatrizAbsoluta();









//elemento1 = $$('body div div div')[0].childElements()[0];
//elemento2 = $$('body div div div')[1].childElements()[1];

//if ($j('elemento1').attr('src') == ($j('elemento2').attr('src')))
  //{
    //console.log("elemento contiguo igual");
  //}
  //else
    //{
      //console.log("elemento contiguo no igual");
    //}







//$j(function()
  //{
  //  $j("#col-1 child")

    //$j("#col-1").html("<img src='image/3.png' class='elemento'/>");
    //for (i = 0; i < 6; i++)
      //{
        //$j(".elemento:last-of-type").after("<img src='image/3.png' class='elemento'/>");
      //}
  //})
