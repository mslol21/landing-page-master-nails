Add-Type -AssemblyName System.Drawing

$outDir = Join-Path $PSScriptRoot "..\public\images"
if (-not (Test-Path $outDir)) {
    New-Item -ItemType Directory -Path $outDir -Force | Out-Null
}

function New-EditorialNailImage {
    param(
        [string]$FileName,
        [int]$Width,
        [int]$Height,
        [string]$Category,
        [string]$Title,
        [string]$Subtitle,
        [string]$ShapeType = "almond"
    )

    $bmp = New-Object System.Drawing.Bitmap($Width, $Height)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit

    # Background studio gradient (Obsidian to warm charcoal)
    $rect = New-Object System.Drawing.Rectangle(0, 0, $Width, $Height)
    $bgColor1 = [System.Drawing.Color]::FromArgb(255, 14, 14, 18)
    $bgColor2 = [System.Drawing.Color]::FromArgb(255, 28, 25, 30)
    $bgBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($rect, $bgColor1, $bgColor2, 45.0)
    $g.FillRectangle($bgBrush, $rect)

    # Subtle radial warm studio spotlight in center
    $centerPath = New-Object System.Drawing.Drawing2D.GraphicsPath
    $spotSize = [Math]::Min($Width, $Height) * 0.85
    $spotX = ($Width - $spotSize) / 2
    $spotY = ($Height - $spotSize) / 2 - ($Height * 0.05)
    $centerPath.AddEllipse($spotX, $spotY, $spotSize, $spotSize)
    $pathBrush = New-Object System.Drawing.Drawing2D.PathGradientBrush($centerPath)
    $pathBrush.CenterColor = [System.Drawing.Color]::FromArgb(48, 212, 175, 55)
    $pathBrush.SurroundColors = @([System.Drawing.Color]::FromArgb(0, 14, 14, 18))
    $g.FillPath($pathBrush, $centerPath)

    # Subtle border frame
    $goldPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(70, 212, 175, 55), 1.5)
    $g.DrawRectangle($goldPen, 24, 24, $Width - 48, $Height - 48)

    # Draw stylized nail structure / portrait illustration in center
    $cx = $Width / 2
    $cy = ($Height / 2) - 40

    if ($ShapeType -eq "portrait") {
        # Elegant silhouette emblem for Instructor
        $circlePen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(140, 212, 175, 55), 2)
        $g.DrawEllipse($circlePen, [int]($cx - 95), [int]($cy - 95), 190, 190)
        $innerBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(30, 212, 175, 55))
        $g.FillEllipse($innerBrush, [int]($cx - 85), [int]($cy - 85), 170, 170)

        $initialsFont = New-Object System.Drawing.Font("Georgia", 44, [System.Drawing.FontStyle]::Regular)
        $goldBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(230, 212, 175, 55))
        $sf = New-Object System.Drawing.StringFormat
        $sf.Alignment = [System.Drawing.StringAlignment]::Center
        $sf.LineAlignment = [System.Drawing.StringAlignment]::Center
        $g.DrawString("KM", $initialsFont, $goldBrush, [float]$cx, [float]$cy, $sf)
    }
    else {
        # Nail Tip Technical Structure Diagram / Studio Visual
        $nailW = 96
        $nailH = 210
        $nx = [int]($cx - ($nailW / 2))
        $ny = [int]($cy - ($nailH / 2))

        $nudeColor1 = [System.Drawing.Color]::FromArgb(220, 232, 198, 188)
        $nudeColor2 = [System.Drawing.Color]::FromArgb(240, 198, 152, 142)
        $nailRect = New-Object System.Drawing.Rectangle($nx, $ny, $nailW, $nailH)
        $nailBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($nailRect, $nudeColor1, $nudeColor2, 90.0)

        $nailPath = New-Object System.Drawing.Drawing2D.GraphicsPath
        $nailPath.AddArc($nx, $ny, $nailW, 110, 180, 180)
        $nailPath.AddArc($nx, $ny + $nailH - 80, $nailW, 80, 0, 180)
        $nailPath.CloseFigure()

        $g.FillPath($nailBrush, $nailPath)
        $outlinePen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(180, 212, 175, 55), 2)
        $g.DrawPath($outlinePen, $nailPath)

        # Light reflection line (Alinhamento de luz)
        $highlightPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(170, 255, 255, 255), 3)
        $g.DrawLine($highlightPen, [int]($cx - 14), [int]($ny + 28), [int]($cx - 14), [int]($ny + $nailH - 35))
    }

    # Typography at bottom
    $sfCenter = New-Object System.Drawing.StringFormat
    $sfCenter.Alignment = [System.Drawing.StringAlignment]::Center

    $catFont = New-Object System.Drawing.Font("Arial", 10, [System.Drawing.FontStyle]::Bold)
    $titleFont = New-Object System.Drawing.Font("Georgia", 18, [System.Drawing.FontStyle]::Bold)
    $subFont = New-Object System.Drawing.Font("Arial", 10, [System.Drawing.FontStyle]::Regular)

    $goldTextBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 212, 175, 55))
    $whiteBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 245, 245, 247))
    $mutedBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(210, 175, 175, 182))

    $textY = $Height - 135
    $g.DrawString($Category.ToUpper(), $catFont, $goldTextBrush, [float]$cx, [float]$textY, $sfCenter)
    $g.DrawString($Title, $titleFont, $whiteBrush, [float]$cx, [float]($textY + 24), $sfCenter)
    $g.DrawString($Subtitle, $subFont, $mutedBrush, [float]$cx, [float]($textY + 62), $sfCenter)

    $fullPath = Join-Path $outDir $FileName
    $bmp.Save($fullPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)

    $g.Dispose()
    $bmp.Dispose()
}

New-EditorialNailImage -FileName "hero-gel-na-tips.jpg" -Width 800 -Height 1000 `
    -Category "Master Nails • Gel na Tips" `
    -Title "Estrutura & Acabamento Profissional" `
    -Subtitle "Substitua por public/images/hero-gel-na-tips.jpg"

New-EditorialNailImage -FileName "detalhe-aplicacao-tips.jpg" -Width 800 -Height 600 `
    -Category "Aplicação Passo a Passo" `
    -Title "Detalhe de Nivelamento e Cutícula" `
    -Subtitle "Substitua por public/images/detalhe-aplicacao-tips.jpg"

New-EditorialNailImage -FileName "kamila-martins-instrutora.jpg" -Width 640 -Height 800 `
    -Category "Nail Designer e Instrutora" `
    -Title "Kamila Martins" `
    -Subtitle "Itaquera, São Paulo • public/images/kamila-martins-instrutora.jpg" `
    -ShapeType "portrait"

New-EditorialNailImage -FileName "galeria-trabalho-01.jpg" -Width 600 -Height 600 `
    -Category "Galeria • Trabalho 01" `
    -Title "Estrutura Amendoada Natural" `
    -Subtitle "Nivelamento de superfície e área da cutícula"

New-EditorialNailImage -FileName "galeria-trabalho-02.jpg" -Width 600 -Height 600 `
    -Category "Galeria • Trabalho 02" `
    -Title "Francesinha de Sorriso Simétrico" `
    -Subtitle "Alinhamento de ponta e brilho vitrificado"

New-EditorialNailImage -FileName "galeria-trabalho-03.jpg" -Width 600 -Height 600 `
    -Category "Galeria • Trabalho 03" `
    -Title "Formato Quadrado & Curvatura" `
    -Subtitle "Paredes laterais retas e espessura fina"

New-EditorialNailImage -FileName "galeria-trabalho-04.jpg" -Width 600 -Height 600 `
    -Category "Galeria • Trabalho 04" `
    -Title "Estrutura Bailarina Suave" `
    -Subtitle "Adaptação da tip sem degraus e selagem precisa"

New-EditorialNailImage -FileName "galeria-trabalho-05.jpg" -Width 600 -Height 600 `
    -Category "Galeria • Trabalho 05" `
    -Title "Alinhamento de Luz & Lixamento" `
    -Subtitle "Superfície uniforme com lixamento técnico"

New-EditorialNailImage -FileName "galeria-trabalho-06.jpg" -Width 600 -Height 600 `
    -Category "Galeria • Trabalho 06" `
    -Title "Acabamento Delicado & Resistente" `
    -Subtitle "Equilíbrio entre resistência e naturalidade"

Write-Output "Generated 9 studio JPEG images in $outDir"
