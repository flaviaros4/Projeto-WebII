package com.maintech.backend.service;

import java.awt.Color;
import java.io.ByteArrayOutputStream;
import java.math.BigDecimal;
import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lowagie.text.Document;
import com.lowagie.text.Element;
import com.lowagie.text.Font;
import com.lowagie.text.FontFactory;
import com.lowagie.text.PageSize;
import com.lowagie.text.Paragraph;
import com.lowagie.text.Phrase;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import com.maintech.backend.dto.RelatorioCategoriaDTO;
import com.maintech.backend.dto.RelatorioDiarioDTO;
import com.maintech.backend.repository.SolicitacaoRepository;

@Service
public class RelatorioService {

    @Autowired
    private SolicitacaoRepository solicitacaoRepository;

    public byte[] gerarRelatorioReceitaPorPeriodo(LocalDate inicio, LocalDate fim) {
        LocalDateTime dataInicio = (inicio != null) ? inicio.atStartOfDay() : LocalDateTime.of(2000, 1, 1, 0, 0);
        LocalDateTime dataFim = (fim != null) ? fim.atTime(LocalTime.MAX) : LocalDateTime.now();

        List<RelatorioDiarioDTO> dados = solicitacaoRepository.findReceitaPorPeriodo(dataInicio, dataFim);

        return gerarPdfGenerico("Relatório de Receita por Período", dados, 
                "Período: " + formatarData(dataInicio) + " até " + formatarData(dataFim));
    }

    public byte[] gerarRelatorioReceitaPorCategoria() {
        List<RelatorioCategoriaDTO> dados = solicitacaoRepository.findReceitaPorCategoria();
        return gerarPdfGenerico("Relatório de Receita por Categoria", dados, "Dados totais consolidados");
    }

    private byte[] gerarPdfGenerico(String titulo, List<?> dados, String subtitulo) {
        try (ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Document document = new Document(PageSize.A4);
            PdfWriter.getInstance(document, out);
            document.open();

            Font fontTitulo = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18, Color.BLUE);
            Paragraph paragraphTitulo = new Paragraph(titulo, fontTitulo);
            paragraphTitulo.setAlignment(Element.ALIGN_CENTER);
            document.add(paragraphTitulo);

            Font fontSub = FontFactory.getFont(FontFactory.HELVETICA, 12, Color.DARK_GRAY);
            Paragraph paragraphSub = new Paragraph(subtitulo, fontSub);
            paragraphSub.setAlignment(Element.ALIGN_CENTER);
            paragraphSub.setSpacingAfter(20);
            document.add(paragraphSub);

            PdfPTable table = new PdfPTable(2);
            table.setWidthPercentage(100);
            table.setSpacingBefore(10f);
            table.setSpacingAfter(10f);

            adicionarCabecalho(table, dados.isEmpty() || dados.get(0) instanceof RelatorioDiarioDTO ? "Data" : "Categoria");
            adicionarCabecalho(table, "Receita (R$)");

            NumberFormat currencyFormat = NumberFormat.getCurrencyInstance(new Locale("pt", "BR"));
            SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");

            BigDecimal totalGeral = BigDecimal.ZERO;

            for (Object obj : dados) {
                if (obj instanceof RelatorioDiarioDTO) {
                    RelatorioDiarioDTO dto = (RelatorioDiarioDTO) obj;
                    table.addCell(criarCelula(dateFormat.format(dto.getData())));
                    table.addCell(criarCelula(currencyFormat.format(dto.getValorTotal())));
                    totalGeral = totalGeral.add(dto.getValorTotal());
                } else if (obj instanceof RelatorioCategoriaDTO) {
                    RelatorioCategoriaDTO dto = (RelatorioCategoriaDTO) obj;
                    table.addCell(criarCelula(dto.getCategoria()));
                    table.addCell(criarCelula(currencyFormat.format(dto.getValorTotal())));
                    totalGeral = totalGeral.add(dto.getValorTotal());
                }
            }

            PdfPCell cellTotalLabel = new PdfPCell(new Phrase("TOTAL GERAL"));
            cellTotalLabel.setBackgroundColor(Color.LIGHT_GRAY);
            table.addCell(cellTotalLabel);

            PdfPCell cellTotalValue = new PdfPCell(new Phrase(currencyFormat.format(totalGeral)));
            cellTotalValue.setBackgroundColor(Color.LIGHT_GRAY);
            table.addCell(cellTotalValue);

            document.add(table);
            
            if(dados.isEmpty()) {
                document.add(new Paragraph("Nenhum dado encontrado para o período/filtro selecionado."));
            }

            document.close();
            return out.toByteArray();
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Erro ao gerar PDF", e);
        }
    }

    private void adicionarCabecalho(PdfPTable table, String texto) {
        PdfPCell header = new PdfPCell();
        header.setBackgroundColor(new Color(0, 102, 204));
        header.setPadding(5);
        Font font = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12, Color.WHITE);
        header.setPhrase(new Phrase(texto, font));
        table.addCell(header);
    }
    
    private PdfPCell criarCelula(String texto) {
        PdfPCell cell = new PdfPCell(new Phrase(texto));
        cell.setPadding(5);
        return cell;
    }

    private String formatarData(LocalDateTime data) {
        return data.format(java.time.format.DateTimeFormatter.ofPattern("dd/MM/yyyy"));
    }
}