let layerArr=[];
let lastLayer;

class Creater {
    constructor(name){
      this.name=$(`<div class="layer-name">${name}</div>`);
      this.li=$(`<li class="li">`);
      this.visible=$(`<div class="visibitlity eye"></div>`);
      this.deleteButton=$(`<button class="delete-layer"></button>`);
      this.input=$(`<input class="change-name" style="display: none;" value="${name}"></input>`);
    }

    createrlayer(){
      let promise= new Promise((resolve)=>{
        resolve($('#layers-panel').append(this.li));
      }).then((resolve)=>{
        this.li.click((e)=>this.liActiveFunction(e));
        this.li.append(this.visible);
        this.visible.click(()=>this.visible.hasClass('blind')?this.visible.removeClass('blind'):this.visible.addClass('blind'));
        this.li.append(this.name);
        this.li.append(this.deleteButton);
        this.name.click(()=>this.chooseLayer());
        this.name.contextmenu((e)=>{this.contextmenuFunction(e);});
        this.name.dblclick(()=>this.dublClick());
        this.li.append(this.input);
        this.input.keypress((e)=>{if (e.which == 13) {this.changeNameFunction();}});
        this.deleteButton.click(()=>this.deleteFunction());

      });

    }
    liActiveFunction(e){
      if(!$(e.target).hasClass('visibitlity'))
      {
        if($('#layers-panel').children().hasClass('active')){
          $('#layers-panel').children().removeClass('active');
        }
        this.li.addClass('active');
      }

    }

    chooseLayer(){
      console.log(`You chose layer "${this.name.html()}"`);
    }

    dublClick(){
      this.input.css("display","block");
      lastLayer=this.input;
    }

    deleteFunction(){
        /*layerArr.splice(0,1);*/        
        this.li.remove();
    }

    changeNameFunction(){
      this.input.css("display","none");
      this.name.html(this.input[0].value);
    }

    contextmenuFunction(e){
      $("#properties").css("display","block");
      $("#properties").css("top",e.pageY-30+"px");
      e.preventDefault();
    }

    hideChangeNameInput(){
      $(document).click((e)=>{
        if(e.target.className!="layer-name"&&e.target.className!="change-name"){
          if(lastLayer!==undefined){
              lastLayer.css("display","none");
            }
        }
      });
    }

  }


  class Properties  {
        constructor(name) {
          this.box=[
            {name:$(`<div style="" class="brightness"></div>`),
            header:$('<div class="header-class">Brightness</div>'),
            div:$(`<div class="prop-inner"></div>`),
              options:`<input type="range" min="0" max="100" step="1" value="50"> `
          },{
            name:$(`<div style="" class="shadow"></div>`),
            header:$('<div style="" class="header-class">Shadow</div>'),
            div:$(`<div class="prop-inner"></div>`),
            options:`<select>
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Big">Big</option>
                      </select>`
          },{
            name:$(`<div style="" class="autorotation"></div>`),
            header:$('<div style="" class="header-class">Autorotation</div>'),
            div:$(`<div class="prop-inner"></div>`),
            options:`<form class="autorotation-select" action="">
                        <div class="form-group">
                          <input type="radio" checked name="autorotation" value="1">
                          <label for="gender">Yes</label>
                        </div>
                        <div class="form-group">
                          <input type="radio" name="autorotation" value="0">
                          <label for="autorotation">No</label>
                        </div>
                      </form>`
          }
        ];

        }
        promiseProperties() {
          return new Promise((resolve)=>{

            resolve(
              this.box.forEach((item, i)=>{
                  $('#properties').append(this.box[i].name);

              })
          );
        });
        }

        createProperties(){
          this.promiseProperties().then((resolve)=>{

            this.box.forEach((item, i)=>{
              this.box[i].name.append(this.box[i].header);
              this.box[i].header.click(()=>this.box[i].div.css("display")=="none" ? this.box[i].div.css("display","block") : this.box[i].div.css("display","none"));

            });
          }).then((resolve)=>{
            this.box.forEach((item, i)=>{
              this.box[i].name.append(this.box[i].div);

            });
          }).then((resolve)=>{
            this.box.forEach((item, i)=>{
              this.box[i].div.append(this.box[i].options);

            });
          });
        }
    }


let properties= new Properties().createProperties();
let creater2 = new Creater().hideChangeNameInput();
  $(".generate").submit(function (event){
      let name=$(".generate-input").val();
      layerArr.push(name);
      $(".generate-input").val('');
      $("#properties-close").click(()=>{
        $('#properties').css("display","none");
      });
      if(name.length<1){
        name=`Layer${layerArr.length}`;
      }
      let creater = new Creater(name);
      creater.createrlayer(name);

      let props = new Properties();
      props.toString();
  event.preventDefault();

  });

$("#properties").draggable();
