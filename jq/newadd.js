function add(obj) {
    var data = $(obj).data();
    $.showModal({
        title: '添加',
        area: '460px',
        content: template('tpl-add', data),
        uCheck: true,
        success: function($content) {},
        yes: function($content) {
            $content.find('form').ajaxSubmit({
                url: '<?= url('point.pointtype/add') ?>',
                success: function(result) {
                    if (result.code == 1) {
                        console.log('aaa', data.level);
                        if (data.level == 0) {
                            console.log(obj);
                        //添加一级菜单
                        var str_one = '<li class="toolbarTree1Li"><div class="firstMenu"><span class="subtraction" onClick="subtraction(this)" data-number="1">+</span><span style="margin-left: 20px"><span style="color:#999;">'+result.data.point_type_id+'</span>&nbsp;&nbsp;'+result.data.point_type_name+'</span><div style="margin-left:20px" class="firstOperation"><span class="cursor firstEdit" onClick="edit(this)" data-id="'+result.data.point_type_id+'" data-name="'+result.data.point_type_name+'" data-sign="'+result.data.sign+'" data-point="'+result.data.point+'" data-type="'+result.data.type+'"><img class="img" src="assets/store/img/jpg/bianji.png"></span><span class="cursor j-add" onClick="add(this)" data-level="1" data-fid="'+result.data.point_type_id+'"><img class="img" src="assets/store/img/jpg/add.png"></span></div></div><div class="lineLeft"></div></li>';
                        $('#toolbarTree1').append(str_one);
                        }else if (data.level == 1) {
                            var str_two = ''
                            if(result.data.brother <2){
                                str_two = '<div class="secondMenuBox">';
                            }
                            str_two +=  '<div class="secondMenu"><div><span style="color:#999;">' + result.data.point_type_id + '</span>&nbsp;&nbsp;' + result.data.point_type_name + '&nbsp;&nbsp;&nbsp;&nbsp;';
                            //判断加减分数
                            if (result.data.point > 0) {
                                str_two += '+' + result.data.point + '分';
                            } else if (result.data.point < 0) {
                                str_two += result.data.point + '分';
                            }
                            str_two += '</div><div style="margin-left: 20px"><span class="cursor firstEdit" onClick="edit(this)" data-id="' + result.data.point_type_id + '" data-name="' + result.data.point_type_name + '" data-sign="' + result.data.sign + '" data-point="' + result.data.point + '" data-type="' + result.data.type + '"><img class="img" src="assets/store/img/jpg/bianji.png" /></span>';
                            if (result.data.type == 1) {
                                str_two += '<span class="cursor j-add" data-level='+2+' onClick="add(this)" data-fid=" '+ result.data.point_type_id +' "><img class=" img" src="assets/store/img/jpg/add.png" /></span>';
                            }
                            str_two += '</div></div>';
                            if(result.data.brother <2){
                                str_two += ' </div>';
                            }
                            // console.log(str_two);
                            /*让页面能立即渲染出来*/
                            if(result.data.brother <2){
                                $(obj).parent().parent().after(str_two)   
                            }else{
                                $(obj).parent().parent().next().append(str_two)     
                            }
                            $(obj).parent().parent().find('.subtraction').text('-')
                            $(obj).parent().parent().next().css('display','block')
                        } else if(data.level == 2){
                            console.log(result.data);
                            var str_three = ''
                            if(result.data.brother <2){
                                str_three = '<div class="thirdMenuBox thirdMenuBox-'+result.data.fid+'">';
                            }
                            str_three +=  '<div class="thirdMenu"><div><span style="color:#999;">' + result.data.point_type_id + '</span>&nbsp;&nbsp;' + result.data.point_type_name + '&nbsp;&nbsp;&nbsp;&nbsp;';
                            //判断加减分数
                            if (result.data.point > 0) {
                                str_three += '+' + result.data.point + '分';
                            } else if (result.data.point < 0) {
                                str_three += result.data.point + '分';
                            }
                            str_three += '</div><div style="margin-left: 20px"><span class="cursor firstEdit" onClick="edit(this)" data-id="' + result.data.point_type_id + '" data-name="' + result.data.point_type_name + '" data-sign="' + result.data.sign + '" data-point="' + result.data.point + '" data-type="' + result.data.type + '"><img class="img" src="assets/store/img/jpg/bianji.png" /></span>';
                            if (result.data.type == 1) {
                                str_three += '<span class="cursor j-add" data-level='+3+' onClick="add(this)" data-fid=" '+ result.data.point_type_id +' "><img class=" img" src="assets/store/img/jpg/add.png" /></span>';
                            }
                            str_three += '</div></div>';
                            if(result.data.brother <2){
                                str_three += ' </div>';
                            }
                            /*让页面能立即渲染出来*/
                            if(result.data.brother <2){
                                $(obj).parent().parent().after(str_three)   
                            }else{
                                $(obj).parent().parent().next().append(str_three)     
                            }

                            if($(obj).parent().parent().find('.subtraction')[0]){
                                $(obj).parent().parent().find('.subtraction').text('-')
                            }else{
                                var subtraction='<span class="subtraction" onClick="subtraction(this)" data-number="2" data-id="'+result.data.fid+'">-</span>'
                                $(obj).parent().parent().prepend(subtraction)
                            }
                            $(obj).parent().parent().next().css('display','block')
                        }else if(data.level == 3){
                            var str_four = ''
                            if(result.data.brother <2){
                                str_four = '<div class="fourthMenuBox fourthMenuBox-'+result.data.fid+'">';
                            }
                            str_four +=  '<div class="fourthMenu"><div><span style="color:#999;">' + result.data.point_type_id + '</span>&nbsp;&nbsp;' + result.data.point_type_name + '&nbsp;&nbsp;&nbsp;&nbsp;';
                            //判断加减分数
                            if (result.data.point > 0) {
                                str_four += '+' + result.data.point + '分';
                            } else if (result.data.point < 0) {
                                str_four += result.data.point + '分';
                            }
                            str_four += '</div><div style="margin-left: 20px"><span class="cursor firstEdit" onClick="edit(this)" data-id="' + result.data.point_type_id + '" data-name="' + result.data.point_type_name + '" data-sign="' + result.data.sign + '" data-point="' + result.data.point + '" data-type="' + result.data.type + '"><img class="img" src="assets/store/img/jpg/bianji.png" /></span>';
                            if (result.data.type == 1) {
                                str_four += '<span class="cursor j-add" data-level='+4+' onClick="add(this)" data-fid=" '+ result.data.point_type_id +' "><img class=" img" src="assets/store/img/jpg/add.png" /></span>';
                            }
                            str_four += '</div></div>';
                            if(result.data.brother <2){
                                str_four += ' </div>';
                            }
                            /*让页面能立即渲染出来*/
                            if(result.data.brother <2){
                                $(obj).parent().parent().after(str_four)   
                            }else{
                                $(obj).parent().parent().next().append(str_four)     
                            }

                            if($(obj).parent().parent().find('.subtraction')[0]){
                                $(obj).parent().parent().find('.subtraction').text('-')
                            }else{
                                var subtraction='<span class="subtraction" onClick="subtraction(this)" data-number="3" data-id="'+result.data.fid+'">-</span>'
                                $(obj).parent().parent().prepend(subtraction)
                            }
                            $(obj).parent().parent().next().css('display','block')
                        }
                      
                    }
                }
            });
            return true;
        }
    });
};