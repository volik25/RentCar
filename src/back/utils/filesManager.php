<?php
class FilesManager{
    public function upload($file, $path, $prefix){
        if(!file_exists($path)){
            mkdir($path);
        }
        if($file != null){
            $n = basename($prefix."_".$file['name']);
            $d = $path."/".$n;
            if(move_uploaded_file($file['tmp_name'], $d)){
                return($n);
            }else{
                return($file['tmp_name']);
            }
        }
    }
    
    public function remove($filelink){
        $path = explode('RentCarBack/',$filelink);
        if($path[1]){
            unlink($path[1]);
        }
    }
}

?>