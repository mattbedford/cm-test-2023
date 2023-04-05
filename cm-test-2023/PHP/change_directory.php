<?php
class Path {
  // Properties
  public $currentPath;
  private $parts;
  
  //Initializing
  function __construct($currentPath) {
    $this->currentPath = $currentPath;
    $this->rootSymbol = '/';
    // Split current dir into the parts of its path
    $this->parts = explode($this->rootSymbol, $currentPath);
  }
  
  function cd($targetPath) {
    // Split target dir into an array
  	$dirs = explode($this->rootSymbol, $targetPath);
    
    foreach($dirs as $index => $dir) {
    	switch ($dir) {
            // Tilde in bash is home directory, so we empty our path dirs
        	case '~':
            $this->parts = [];
            break;
            
            // If any iteration other than the first is empty, we're heading to the root directory
            case '':
            if($index !== 0) $this->parts = [];
            break;
            
            // Going up a level, so remove one dir from current path dirs list
        	  case '..':
            array_pop($this->parts);
            break;
                
            // . means current dir, so we don't need to do anything here
            case '.':
            break;
            
            // Else, we have a directory, so we add to our path dirs list 
            default:
            array_push($this->parts, $dir);        
        }
    }
    // Finally, assemble path dir list into a single string and set as currentPath
    $this->currentPath = implode($this->rootSymbol, $this->parts);
  }
  
}

$path = new Path('/a/b/c/d');
$path->cd('../z');
echo $path->currentPath . "</br>";
$path->cd('/e/x');
echo $path->currentPath . "</br>";
// Etc..
?>
